<?php

namespace Acms\Plugins\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Builder\Record as RecordBuilder;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Collections\RecordDependencyLevel;

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
     * Zoho CRMにデータを送信
     *
     * レコードを依存関係とモジュール・タイプごとにグループ化し、
     * 依存関係を保ちながら一括でAPIに送信します。
     *
     * Lookupフィールドの依存関係を正しく処理するため、
     * 参照先のレコードを先に送信してIDを取得してから、参照元のレコードを送信します。
     */
    public function send()
    {
        try {
            if (is_null($this->zohoClient)) {
                AcmsLogger::error('【Zoho plugin】Zohoクライアントの初期化に失敗しました。');
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

            // 成功・失敗の集計
            $createdCount = 0;
            $updatedCount = 0;
            $allFailures = [];

            // 依存関係レベルごとにグループ化
            $dependencyLevels = $this->groupRecordsByDependencyLevel($recordBuilder, $records);

            // 依存先から順に、レベルごとの処理
            foreach ($dependencyLevels as $level) {
                $levelRecords = $level->getRecords();
                // このレベルのレコードのLookupフィールドを解決
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

                    // ZohoAPIの上限である最大100件ずつ一括送信
                    $chunks = array_chunk($groupRecords, 100);
                    foreach ($chunks as $chunk) {
                        if ($type === 'update') {
                            $result = $recordApi->updateRecords($chunk);
                            $updatedCount += $result['success'];
                            $allFailures = array_merge($allFailures, $result['failures']);
                        } else {
                            $result = $recordApi->insertRecords($chunk);
                            $createdCount += $result['success'];
                            $allFailures = array_merge($allFailures, $result['failures']);
                        }

                        // 処理済みレコードに追加
                        foreach ($chunk as $record) {
                            $processedRecords[] = $record;
                        }
                    }
                }
            }

            // 件数が多いほどログが増えてしまう為まとめて出力
            $messages = [];
            if ($createdCount > 0) {
                $messages[] = "レコードを{$createdCount}件作成";
            }
            if ($updatedCount > 0) {
                $messages[] = "レコードを{$updatedCount}件更新";
            }

            if (!empty($messages)) {
                $summary = implode('、', $messages) . 'しました。';
                AcmsLogger::info('【Zoho plugin】データの一括送信が完了しました。' . $summary);
            } else {
                AcmsLogger::info('【Zoho plugin】データの一括送信が完了しました。');
            }

            // 失敗のログ
            if (!empty($allFailures)) {
                AcmsLogger::error('【Zoho plugin】レコードの送信に失敗しました。', [
                    'failures' => $allFailures
                ]);
            }
        } catch (\Exception $e) {
            AcmsLogger::error(
                '【Zoho plugin】データの一括送信に失敗しました。',
                Common::exceptionArray($e)
            );
        }
    }

    /**
     * レコードを依存関係のレベルごとにグループ化
     *
     * @param RecordBuilder $recordBuilder
     * @param array $records ソート済みのレコード配列
     * @return RecordDependencyLevel[] レベルごとにグループ化されたレコード配列（レベル順）
     */
    private function groupRecordsByDependencyLevel(RecordBuilder $recordBuilder, array $records): array
    {
        $dependencies = $recordBuilder->getDependencyMap();
        $levels = [];
        $moduleLevels = [];

        // 各モジュールの依存レベルを計算してレベルごとに追加
        foreach ($records as $record) {
            $module = $record->getModuleApiName();

            if (!isset($moduleLevels[$module])) {
                $moduleLevels[$module] = $this->calculateModuleLevel($module, $dependencies);
            }

            $levelNumber = $moduleLevels[$module];

            if (!isset($levels[$levelNumber])) {
                $levels[$levelNumber] = new RecordDependencyLevel($levelNumber);
            }

            $levels[$levelNumber]->addRecord($record);
        }

        // レベル順にソート
        ksort($levels);
        return array_values($levels);
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
}
