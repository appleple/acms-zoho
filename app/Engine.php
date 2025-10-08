<?php

namespace Acms\Plugins\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Builder\Record as RecordBuilder;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;

/**
 * Zoho拡張アプリの実行クラス
 */
class Engine
{
    /** @var Field */
    private $field;

    /** @var Field */
    private $config;

    /** @var ZohoClient */
    private $zohoClient;

    /**
     * @param $field Postされたフォームのデータ
     * @param $config フォームIDのconfigデータ
     */
    public function __construct($field, $config)
    {
        $this->field = $field;
        $this->config = $config;

        $zohoClient = new ZohoClient();
        $zohoClient->initialize();

        if (is_null($zohoClient->getAccessToken())) {
            return;
        }

        $this->zohoClient = $zohoClient;
    }

    /**
     * Zoho CRMにデータを送信（一括処理版）
     *
     * レコードを依存関係とモジュール・タイプごとにグループ化し、
     * 依存関係を保ちながら一括でAPIに送信します。
     *
     * Lookupフィールドの依存関係を正しく処理するため、
     * 参照先のレコードを先に送信してIDを取得してから、参照元のレコードを送信します。
     */
    public function send()
    {
        AcmsLogger::info('【Zoho plugin】=============== Zohoへ一括送信準備中です。===============');

        try {
            if (is_null($this->zohoClient)) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::error('【Zoho plugin】Zohoクライアントの初期化に失敗しました。');
                }
                return;
            }

            // Zoho APIクライアントの作成
            $api = new ZohoApi($this->zohoClient);
            $recordApi = $api->record();

            $recordBuilder = new RecordBuilder($this->field, $this->config);

            // レコードの構造体作成
            $records = $recordBuilder->buildRecords($recordApi);

            // 依存関係順に並び替え（ルックアップの参照先が先に処理されるように）
            $records = $recordBuilder->sortRecordsByDependency($records);

            // 処理済みレコードを格納する配列
            $processedRecords = [];

            // 依存関係レベルを計算してグループ化
            $levelGroups = $this->groupRecordsByDependencyLevel($records, $recordBuilder);

            // レベルごとに処理
            foreach ($levelGroups as $levelRecords) {
                // このレベル内でLookupフィールドを解決
                foreach ($levelRecords as $record) {
                    if (empty($record->getFields())) {
                        continue;
                    }
                    $recordBuilder->resolveLookupFields($record, $processedRecords, $recordApi);
                }

                // モジュール・タイプごとにグループ化
                $recordGroups = [];
                foreach ($levelRecords as $record) {
                    if (empty($record->getFields())) {
                        continue;
                    }

                    $module = $record->getModuleApiName();
                    $type = $record->getType();
                    $key = $module . '_' . $type;

                    if (!isset($recordGroups[$key])) {
                        $recordGroups[$key] = [
                            'module' => $module,
                            'type' => $type,
                            'records' => []
                        ];
                    }

                    $recordGroups[$key]['records'][] = $record;
                }

                // グループごとに一括送信
                foreach ($recordGroups as $key => $group) {
                    $module = $group['module'];
                    $type = $group['type'];
                    $groupRecords = $group['records'];

                    // 一括送信（最大100件ずつ）
                    $chunks = array_chunk($groupRecords, 100);
                    foreach ($chunks as $chunk) {
                        if ($type === 'update') {
                            $recordApi->updateRecords($chunk);
                        } else {
                            $recordApi->insertRecords($chunk);
                        }

                        // 処理済みレコードに追加
                        foreach ($chunk as $record) {
                            $processedRecords[] = $record;
                        }
                    }
                }
            }

            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】データの一括送信が完了しました。');
            }
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】データの一括送信に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                AcmsLogger::error(
                    '【Zoho plugin】',
                    $e->getMessage()
                );
            }
        }
    }

    // /**
    //  * Zoho CRMにデータを送信（1件ずつ処理版 - 旧実装）
    //  *
    //  * 注意: この実装は1件ずつAPIを呼び出すため、パフォーマンスに影響します。
    //  * 現在は一括処理版のsend()を使用しています。
    //  */
    // public function sendOld()
    // {
    //     AcmsLogger::info('【Zoho plugin】=============== Zohoへ送信準備中です。===============');
    //
    //     try {
    //         if (is_null($this->zohoClient)) {
    //             if (class_exists('AcmsLogger')) {
    //                 AcmsLogger::error('【Zoho plugin】Zohoクライアントの初期化に失敗しました。');
    //             }
    //             return;
    //         }
    //
    //         // Zoho APIクライアントの作成
    //         $api = new ZohoApi($this->zohoClient);
    //         $recordApi = $api->record();
    //
    //         $recordBuilder = new RecordBuilder($this->field, $this->config);
    //
    //         // ステップ1: フォームから送信されたデータを確認
    //         AcmsLogger::debug('【ステップ1】フォーム送信データ', [
    //             'company' => $this->field->get('company'),
    //             'tel' => $this->field->get('tel')
    //         ]);
    //
    //         // 設定を確認
    //         AcmsLogger::debug('【設定確認】フォーム設定', [
    //             'zoho_form_group_index' => $this->config->getArray('zoho_form_group_index'),
    //             'zoho_form_insert_scope_0' => $this->config->get('zoho_form_insert_scope', '', 0),
    //             'zoho_form_insert_scope_1' => $this->config->get('zoho_form_insert_scope', '', 1),
    //             'zoho_form_update_scope_0' => $this->config->get('zoho_form_update_scope', '', 0),
    //             'zoho_form_update_scope_1' => $this->config->get('zoho_form_update_scope', '', 1)
    //         ]);
    //
    //         // レコードの構造体作成（優先順位設定がある場合は内部でモジュール確定も実行）
    //         $records = $recordBuilder->buildRecords($recordApi);
    //
    //         // 依存関係順に並び替え（ルックアップの参照先が先に処理されるように）
    //         $records = $recordBuilder->sortRecordsByDependency($records);
    //
    //         // ステップ2: レコード生成後のフィールドを確認
    //         AcmsLogger::debug('【ステップ2】レコード生成後（依存順序ソート済み）', [
    //             'recordsCount' => count($records),
    //             'recordsOrder' => array_map(function($r) {
    //                 return $r->getModuleApiName() . ' (' . $r->getType() . ')';
    //             }, $records)
    //         ]);
    //
    //         // 処理済みレコードを格納する配列
    //         $processedRecords = [];
    //
    //         // 依存順序に従って1件ずつ処理
    //         foreach ($records as $record) {
    //             // 空のレコードをスキップ
    //             if (empty($record->getFields())) {
    //                 continue;
    //             }
    //
    //             // ルックアップフィールドの値をIDに変換
    //             $recordBuilder->resolveLookupFields($record, $processedRecords, $recordApi);
    //
    //             // ステップ3: 送信前のレコード確認
    //             AcmsLogger::debug('【ステップ3】送信前のレコード', [
    //                 'module' => $record->getModuleApiName(),
    //                 'type' => $record->getType(),
    //                 'fields' => $record->getFields()
    //             ]);
    //
    //             // レコードを送信
    //             if ($record->getType() === 'update') {
    //                 $recordApi->updateRecords([$record]);
    //             } else {
    //                 $recordApi->insertRecords([$record]);
    //             }
    //
    //             // 処理済みレコードに追加
    //             $processedRecords[] = $record;
    //         }
    //
    //         if (class_exists('AcmsLogger')) {
    //             AcmsLogger::debug('【Zoho plugin】データの送信が完了しました。');
    //         }
    //     } catch (\Exception $e) {
    //         if (class_exists('AcmsLogger')) {
    //             AcmsLogger::error(
    //                 '【Zoho plugin】データの送信に失敗しました。',
    //                 Common::exceptionArray($e)
    //             );
    //         } else {
    //             AcmsLogger::error(
    //                 '【Zoho plugin】',
    //                 $e->getMessage()
    //             );
    //         }
    //     }
    // }

    /**
     * レコードを依存関係のレベルごとにグループ化
     *
     * @param array $records ソート済みのレコード配列
     * @param RecordBuilder $recordBuilder
     * @return array レベルごとにグループ化されたレコード配列
     */
    private function groupRecordsByDependencyLevel(array $records, RecordBuilder $recordBuilder): array
    {
        $dependencies = $recordBuilder->getDependencyMap();
        $levelGroups = [];
        $moduleLevels = [];

        // 各モジュールの依存レベルを計算
        foreach ($records as $record) {
            $module = $record->getModuleApiName();

            if (!isset($moduleLevels[$module])) {
                $moduleLevels[$module] = $this->calculateModuleLevel($module, $dependencies);
            }

            $level = $moduleLevels[$module];

            if (!isset($levelGroups[$level])) {
                $levelGroups[$level] = [];
            }

            $levelGroups[$level][] = $record;
        }

        // レベル順にソート
        ksort($levelGroups);

        return $levelGroups;
    }

    /**
     * モジュールの依存レベルを計算
     *
     * @param string $module モジュール名
     * @param array $dependencies 依存関係マップ
     * @param array $visiting 循環参照チェック用
     * @return int 依存レベル（0=依存なし、1以上=依存あり）
     */
    private function calculateModuleLevel(string $module, array $dependencies, array $visiting = []): int
    {
        // 循環参照チェック
        if (isset($visiting[$module])) {
            return 0;
        }

        // 依存先がない場合はレベル0
        if (!isset($dependencies[$module]) || empty($dependencies[$module])) {
            return 0;
        }

        $visiting[$module] = true;
        $maxLevel = 0;

        // 依存先の最大レベル + 1
        foreach ($dependencies[$module] as $dependency) {
            $level = $this->calculateModuleLevel($dependency, $dependencies, $visiting);
            $maxLevel = max($maxLevel, $level + 1);
        }

        return $maxLevel;
    }

    /**
     * リレーショナル設定に基づいてレコードをソート
     *
     * 関連先（参照される側）が先、関連元（参照する側）が後になるようにソートする
     *
     * @param array $records
     * @return array
     */
    private function sortRecordsByRelation(array $records)
    {
        $zohoRelatedScopes = $this->config->getArray('zoho_related_scope');

        if (empty($zohoRelatedScopes)) {
            return $records;
        }

        // 関連元モジュールのリストを作成
        $relatedSourceModules = [];
        foreach ($zohoRelatedScopes as $i => $relatedScope) {
            $lookupId = $this->config->get('zoho_related_lookup_id', '', $i);
            // ルックアップIDが設定されている場合のみ（ジャンクションは除外）
            if ($lookupId) {
                $relatedSourceModules[] = $relatedScope;
            }
        }

        // 関連元モジュールを後ろに、それ以外を前に配置
        usort($records, function($a, $b) use ($relatedSourceModules) {
            $aIsSource = in_array($a->getModuleApiName(), $relatedSourceModules);
            $bIsSource = in_array($b->getModuleApiName(), $relatedSourceModules);

            if ($aIsSource === $bIsSource) {
                return 0;
            }

            return $aIsSource ? 1 : -1;
        });

        return $records;
    }
}
