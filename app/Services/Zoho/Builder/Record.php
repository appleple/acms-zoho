<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Builder;

use Field;
use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Builder;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record as RecordModel;
use Acms\Plugins\Zoho\Services\Zoho\Models\ModuleScope;

/**
 * Zoho CRM送信用のRecordModelを組み立てるBuilderクラス
 *
 * a-blog cmsのフォームデータからZoho CRMへ送信するRecordModelオブジェクトを生成する
 * Mapperクラス（Zoho→CMS）とは逆方向（CMS→Zoho）の変換を行う
 */
class Record extends Builder
{
    /** @var Field フォームのフィールド */
    public $field;

    /** @var Field FormIDの拡張アプリ設定 */
    public $config;

    /**
     * @var array 左から優先順位の強いモジュールを指定
     * ここで指定されたモジュールは、左から入力データを確認してなければ配列の次に指定してあるモジュールを確認します。
     * もし配列内にあるモジュールに追加・変更のフィールドが設定されているが、既存データが存在しない場合、配列最後のモジュールにデータが追加されます。
     * */
    public $modulePriority = ['Contacts', 'Leads'];

    /** @var RecordModel[]  */
    public $records = [];

    /**
     * コンストラクタ
     *
     * @param Field $field　フォームのフィールド
     * @param Field $config FormIDの拡張アプリ設定
     */
    public function __construct(Field $field, Field $config)
    {
        $this->field = $field;
        $this->config = $config;
    }

    /**
     * フォーム設定から、insert/update用のRecordModelオブジェクトを生成
     *
     * $this->fieldからレコード情報を取得し、RecordModelの配列を返す
     * 優先順位設定がある場合は、APIで検索してモジュールを確定する
     *
     * @param ZohoApi $api ZohoApiのインスタンス（優先順位処理に必要）
     * @return RecordModel[]
     */
    public function buildRecords($recordApi = null)
    {
        $records = $this->getRecordsByForm();

        // 優先順位設定がある場合、APIで検索してモジュールを確定
        if ($recordApi !== null && !empty($this->modulePriority)) {
            $this->assignModuleByPriority($recordApi, $records);
        }

        return $records;
    }

    /**
     * レコードを依存関係順に並び替え
     *
     * ルックアップの参照先モジュールが先に作成されるように並び替える
     *
     * @param RecordModel[] $records レコード配列
     * @return RecordModel[] 並び替えられたレコード配列
     */
    public function sortRecordsByDependency(array $records): array
    {
        $dependencies = $this->getDependencyMap();

        // 依存関係がない場合はそのまま返す
        if (empty($dependencies)) {
            return $records;
        }

        // モジュールごとにレコードをグループ化
        $grouped = [];
        foreach ($records as $record) {
            $module = $record->getModuleApiName();
            if (!isset($grouped[$module])) {
                $grouped[$module] = [];
            }
            $grouped[$module][] = $record;
        }

        // トポロジカルソート
        $sorted = [];
        $visited = [];
        $visiting = [];
        $modules = array_keys($grouped);

        foreach ($modules as $module) {
            $this->topologicalSortVisit($module, $dependencies, $grouped, $visited, $visiting, $sorted);
        }

        return $sorted;
    }

    /**
     * トポロジカルソートの訪問処理（深さ優先探索）
     *
     * @param string $module モジュール名
     * @param array $dependencies 依存関係マップ
     * @param array $grouped モジュールごとにグループ化されたレコード
     * @param array $visited 訪問完了フラグ
     * @param array $visiting 訪問中フラグ（循環依存検出用）
     * @param array $sorted ソート結果（参照渡し）
     */
    private function topologicalSortVisit(string $module, array $dependencies, array $grouped, array &$visited, array &$visiting, array &$sorted)
    {
        // 既に訪問完了の場合はスキップ
        if (isset($visited[$module])) {
            return;
        }

        // 訪問中のノードに再到達した場合は循環依存
        if (isset($visiting[$module])) {
            AcmsLogger::warning('【Zoho plugin】モジュール間の循環依存を検出しました。依存関係を無視して処理を続行します。', [
                'module' => $module
            ]);
            return;
        }

        $visiting[$module] = true;

        // 依存先を先に処理
        if (isset($dependencies[$module])) {
            foreach ($dependencies[$module] as $dependency) {
                if (isset($grouped[$dependency])) {
                    $this->topologicalSortVisit($dependency, $dependencies, $grouped, $visited, $visiting, $sorted);
                }
            }
        }

        unset($visiting[$module]);
        $visited[$module] = true;

        // このモジュールのレコードを追加
        if (isset($grouped[$module])) {
            $sorted = array_merge($sorted, $grouped[$module]);
        }
    }

    /**
     * フォームデータから設定に基づいてRecordModelを生成
     *
     * 【優先順位設定がある場合（$modulePriorityが設定されている場合）】
     *   - moduleApiName = '__PENDING__', type = 'pending' の仮レコードを生成
     *   - グループインデックスを保持
     *   - 後でassignModuleByPriority()メソッドでAPIを使って検索し、
     *     実際のモジュール（$modulePriority）とタイプ（insert or update）を確定
     *
     * 【優先順位設定がない場合（$modulePriorityが空の場合）】
     *   - zoho_form_insert_scope/update_scopeの設定に基づき、
     *     モジュール名とタイプが確定したレコードを直接生成
     *   - 例: moduleApiName = 'Leads', type = 'insert'
     *
     * @return RecordModel[] 生成されたレコードの配列（フィールドデータは未設定）
     */
    private function getRecordsByForm()
    {
        $zohoScopeGroup = $this->config->getArray('zoho_form_group_index');
        $modulePriority = $this->modulePriority;

        $records = [];

        foreach ($zohoScopeGroup as $i => $_zohoScopeItem) {
            $insertScopes = $this->getInsertScopes($i);
            $updateScopes = $this->getUpdateScopes($i);
            $uniqueKey = $this->getUniqueKey($i);

            // このグループのモジュールがmodulePriorityに含まれているか確認
            $allScopes = array_merge($insertScopes, $updateScopes);
            $hasModulePriority = !empty($modulePriority) &&
                count(array_intersect($allScopes, $modulePriority)) > 0;

            // 優先順位設定があり、かつmodulePriorityに含まれるモジュールの場合は仮レコードを生成
            if ($hasModulePriority) {
                // モジュール未定の仮レコードを生成（グループインデックスを保持）
                $record = new RecordModel('__PENDING__', 'pending', $uniqueKey);
                $record->groupIndex = $i;

                // フィールドデータを追加（グループフィールドは考慮しない、通常フィールドのみ）
                $mappedFields = $this->mapFields($record, null, 0);
                $record->addFields($mappedFields);

                $records[] = $record;
                continue;
            }

            // 優先順位設定がない場合: 直接モジュールを指定してレコード生成
            // insertスコープのレコードを生成
            foreach ($insertScopes as $insertScope) {
                $record = new RecordModel(
                    $insertScope,
                    'insert',
                    in_array($insertScope, $updateScopes) ? $uniqueKey : ''
                );
                $record->groupIndex = $i;

                // フィールドデータを追加
                $mappedFields = $this->mapFields($record, null, 0);
                $record->addFields($mappedFields);

                $records[] = $record;
            }

            // insertに含まれないupdateスコープのみレコードを生成
            foreach ($updateScopes as $updateScope) {
                if (!in_array($updateScope, $insertScopes)) {
                    $record = new RecordModel($updateScope, 'update', $uniqueKey);
                    $record->groupIndex = $i;

                    // フィールドデータを追加
                    $mappedFields = $this->mapFields($record, null, 0);
                    $record->addFields($mappedFields);

                    $records[] = $record;
                }
            }
        }

        return $records;
    }

    /**
     * フォームフィールドをZohoフィールドにマッピング
     *
     * zoho_link_field_* の設定に基づき、対象モジュール・操作タイプに応じて
     * a-blog cms のフィールド値をZohoフィールド名でマッピングする
     *
     * @param RecordModel $record マッピング対象のレコード
     * @param array|null $groupArr グループフィールドのキー配列
     * @param int $index グループフィールドのインデックス
     * @return array マッピングされたフィールド配列 ['Zohoフィールド名' => '値']
     */
    private function mapFields(RecordModel $record, ?array $groupArr, int $index)
    {
        $scope = $record->getModuleApiName();
        $type = $record->getType();
        $fieldKeys = $this->config->getArray('zoho_link_field_module_field');
        $item = [];

        foreach ($fieldKeys as $i => $fieldKey) {
            $key = $this->config->get('zoho_link_field_cms_field', '', $i);
            $scopesJson = $this->config->get('zoho_link_field_module', '', $i);
            $moduleScopes = ModuleScope::parseJsonArray($scopesJson);
            $scopes = ModuleScope::toApiNames($moduleScopes);
            $canInsert = $this->config->get('zoho_link_field_insert', '', $i);
            $canUpdate = $this->config->get('zoho_link_field_update', '', $i);

            // fieldKeyがJSON形式の場合はデコード
            $fieldApiName = $fieldKey;
            $fieldType = null;
            if ($this->isJson($fieldKey)) {
                $fieldData = json_decode($fieldKey, true);
                $fieldApiName = $fieldData['apiName'] ?? $fieldKey;
                $fieldType = $fieldData['dataType'] ?? null;
            }

            // pendingタイプの場合はモジュールチェックをスキップ（全フィールドを取得）
            if ($scope !== '__PENDING__') {
                // スコープが一致しない場合はスキップ
                if (!in_array($scope, $scopes)) {
                    continue;
                }

                // 操作タイプに応じた権限チェック
                $isAllowed = ($type === 'insert' && $canInsert) || ($type === 'update' && $canUpdate);
                if (!$isAllowed) {
                    continue;
                }
            } else {
                // pendingの場合は、insert OR updateが許可されているフィールドを全て取得
                if (!$canInsert && !$canUpdate) {
                    continue;
                }
            }

            $value = $this->getFieldValue($key, $groupArr, $index);
            $normalizedValue = $this->normalizeValue($value);

            // ルックアップフィールドの判定と登録
            $isLookup = $fieldType === 'lookup' || $this->isLookupField($fieldApiName, $scope);
            if ($isLookup) {
                $record->markAsLookupField($fieldApiName);
            }

            // ピックリストフィールドの判定と登録
            if ($fieldType === 'picklist' || $fieldType === 'multiselectpicklist') {
                $record->markAsPicklistField($fieldApiName);
            }

            // 複数行テキストフィールドの判定と登録
            if ($fieldType === 'textarea') {
                $record->markAsTextareaField($fieldApiName);
            }

            // 日付フィールドの判定と登録
            if ($fieldType === 'date') {
                $record->markAsDateField($fieldApiName);
            }

            // 日時フィールドの判定と登録
            if ($fieldType === 'datetime') {
                $record->markAsDatetimeField($fieldApiName);
            }

            // 数値フィールドの判定と登録
            if (in_array($fieldType, ['integer', 'double', 'decimal', 'currency', 'bigint', 'number'])) {
                $record->markAsNumberField($fieldApiName, $fieldType);
            }

            $item[$fieldApiName] = $normalizedValue;
        }

        // Zoho リレーショナル設定からルックアップフィールドを追加
        // zoho_link_field_*の設定がなくても、リレーショナル設定があれば送信できるようにする
        if ($scope !== '__PENDING__') {
            $lookupConfigs = $this->getLookupFieldsConfig($scope);

            foreach ($lookupConfigs as $config) {
                $lookupId = $config['lookupId'];
                $compareField = $config['compareField'];
                $cmsField = $config['cmsField'];

                // 既にフィールドが設定されている場合はスキップ
                if (isset($item[$lookupId])) {
                    continue;
                }

                // a-blog cmsのフィールド名が設定されていない場合はスキップ
                if (empty($cmsField)) {
                    continue;
                }

                // a-blog cmsのフィールドから値を取得
                $compareValue = $this->getFieldValue($cmsField, $groupArr, $index);
                $normalizedCompareValue = $this->normalizeValue($compareValue);

                // 値が空でない場合のみ追加
                if (!empty($normalizedCompareValue)) {
                    $item[$lookupId] = $normalizedCompareValue;
                    $record->markAsLookupField($lookupId);
                }
            }
        }

        return $item;
    }

    /**
     * フォームからフィールド値を取得
     *
     * グループフィールドの場合: 指定インデックスの値を取得
     * 通常フィールドの場合: 配列の全値を"-"で連結
     *
     * @param string $key a-blog cms のフィールド名
     * @param array|null $groupArr グループフィールドのキー配列
     * @param int $index グループフィールドのインデックス
     * @return mixed フィールドの値
     */
    private function getFieldValue(string $key, ?array $groupArr, int $index)
    {
        if ($groupArr && in_array($key, $groupArr)) {
            return $this->field->get($key, '', $index);
        } else {
            return implode("-", $this->field->getArray($key));
        }
    }

    /**
     * 値を適切な型に変換
     *
     * 文字列の "true"/"false" をboolean型に変換する
     *
     * @param mixed $value 変換前の値
     * @return mixed 変換後の値
     */
    private function normalizeValue($value)
    {
        if ($value === 'true') {
            return true;
        } elseif ($value === 'false') {
            return false;
        }
        return $value;
    }

    /**
     * insertScopeを取得
     *
     * @param int $groupIndex
     * @return array
     */
    private function getInsertScopes(int $groupIndex)
    {
        $scopeString = $this->config->get('zoho_form_insert_scope', '', $groupIndex);
        $moduleScopes = ModuleScope::parseJsonArray($scopeString);
        return ModuleScope::toApiNames($moduleScopes);
    }

    /**
     * updateScopeを取得
     *
     * @param int $groupIndex
     * @return array
     */
    private function getUpdateScopes(int $groupIndex)
    {
        $scopeString = $this->config->get('zoho_form_update_scope', '', $groupIndex);
        $moduleScopes = ModuleScope::parseJsonArray($scopeString);
        return ModuleScope::toApiNames($moduleScopes);
    }

    /**
     * uniqueKeyを取得
     *
     * @param int $groupIndex
     * @return string
     */
    private function getUniqueKey(int $groupIndex)
    {
        $uniqueKey = $this->config->get('zoho_form_unique_key', '', $groupIndex);
        return $uniqueKey ?: 'Email';
    }

    /**
     * 指定フィールドがルックアップフィールドかどうかを判定
     *
     * リレーショナル設定（zoho_related_*）を参照して、
     * 該当モジュールの該当フィールドがルックアップIDとして登録されているか確認する
     *
     * @param string $fieldName フィールド名（API名）
     * @param string $moduleName モジュール名
     * @return bool ルックアップフィールドの場合true
     */
    private function isLookupField(string $fieldName, string $moduleName): bool
    {
        $relatedScopes = $this->config->getArray('zoho_related_scope');

        foreach ($relatedScopes as $i => $relatedScope) {
            // 関連元タブが一致するか確認
            if ($relatedScope !== $moduleName) {
                continue;
            }

            // ルックアップIDを取得
            $lookupId = $this->config->get('zoho_related_lookup_id', '', $i);

            // フィールド名が一致するか確認
            if ($lookupId === $fieldName) {
                return true;
            }
        }

        return false;
    }

    /**
     * 指定モジュールのルックアップフィールド設定を取得
     *
     * @param string $moduleName モジュール名
     * @return array ルックアップ設定の配列 [['lookupId' => '', 'targetScope' => '', 'compareField' => '', 'cmsField' => ''], ...]
     */
    private function getLookupFieldsConfig(string $moduleName): array
    {
        $relatedScopes = $this->config->getArray('zoho_related_scope');
        $configs = [];

        foreach ($relatedScopes as $i => $relatedScope) {
            if ($relatedScope !== $moduleName) {
                continue;
            }

            $configs[] = [
                'lookupId' => $this->config->get('zoho_related_lookup_id', '', $i),
                'targetScope' => $this->config->get('zoho_related_target_scope', '', $i),
                'compareField' => $this->config->get('zoho_related_compare_field', '', $i),
                'cmsField' => $this->config->get('zoho_related_cms_field', '', $i)
            ];
        }

        return $configs;
    }

    /**
     * モジュール間の依存関係マップを作成
     *
     * @return array ['Cases' => ['Accounts'], 'Contacts' => ['Accounts'], ...]
     */
    public function getDependencyMap(): array
    {
        $relatedScopes = $this->config->getArray('zoho_related_scope');
        $dependencies = [];

        foreach ($relatedScopes as $i => $relatedScope) {
            $targetScope = $this->config->get('zoho_related_target_scope', '', $i);

            if (!isset($dependencies[$relatedScope])) {
                $dependencies[$relatedScope] = [];
            }

            if (!in_array($targetScope, $dependencies[$relatedScope])) {
                $dependencies[$relatedScope][] = $targetScope;
            }
        }

        return $dependencies;
    }

    /**
     * 処理済みレコードから比較フィールドで検索してIDを取得
     *
     * @param RecordModel[] $processedRecords 処理済みレコード配列
     * @param string $targetScope 検索対象モジュール名
     * @param string $compareField 比較フィールド名
     * @param string $compareValue 比較値
     * @return string|null 見つかったレコードのID、見つからない場合はnull
     */
    public function findInProcessedRecords(array $processedRecords, string $targetScope, string $compareField, string $compareValue): ?string
    {
        foreach ($processedRecords as $processed) {
            if ($processed->getModuleApiName() !== $targetScope) {
                continue;
            }

            $fields = $processed->getFields();
            if (isset($fields[$compareField]) && $fields[$compareField] === $compareValue) {
                return $processed->getId();
            }
        }

        return null;
    }

    /**
     * ルックアップフィールドの値をレコードIDに変換
     *
     * @param RecordModel $record 対象レコード
     * @param RecordModel[] $processedRecords 処理済みレコード配列
     * @param RecordApi $recordApi レコードAPI
     */
    public function resolveLookupFields(RecordModel $record, array $processedRecords, $recordApi)
    {
        $lookupConfigs = $this->getLookupFieldsConfig($record->getModuleApiName());

        // 複数のルックアップ候補（Leads/Contacts等）を収集
        $lookupCandidates = [];

        foreach ($lookupConfigs as $config) {
            $lookupId = $config['lookupId'];
            $targetScope = $config['targetScope'];
            $compareField = $config['compareField'];

            $fields = $record->getFields();
            if (!isset($fields[$lookupId])) {
                continue;
            }

            $lookupValue = $fields[$lookupId];

            // 1. まず今回のバッチで作成されたレコードから検索
            $recordId = $this->findInProcessedRecords(
                $processedRecords,
                $targetScope,
                $compareField,
                $lookupValue
            );

            // 2. 見つからなければZoho APIで検索
            if (!$recordId && $recordApi) {
                $foundRecord = $recordApi->searchByUniqueKey($targetScope, $compareField, $lookupValue);
                if ($foundRecord) {
                    $recordId = $foundRecord['id'];
                }
            }

            if ($recordId) {
                // 見つかった候補を保存（優先順位: Contacts > Leads）
                $priority = ($targetScope === 'Contacts') ? 1 : 0;
                $lookupCandidates[] = [
                    'lookupId' => $lookupId,
                    'recordId' => $recordId,
                    'targetScope' => $targetScope,
                    'priority' => $priority
                ];
            }
        }

        // 全てのルックアップフィールドを一旦削除
        foreach ($lookupConfigs as $config) {
            $lookupId = $config['lookupId'];
            if ($record->hasField($lookupId)) {
                $record->removeField($lookupId);
            }
        }

        // 見つかった候補がある場合、優先順位の高いものを設定
        if (!empty($lookupCandidates)) {
            // 優先順位でソート
            usort($lookupCandidates, function ($a, $b) {
                return $b['priority'] - $a['priority'];
            });

            // 最優先の候補を設定
            $selected = $lookupCandidates[0];
            $record->addFields([$selected['lookupId'] => $selected['recordId']]);
        } else {
            // 全ての候補で見つからなかった場合
            AcmsLogger::debug('【Zoho plugin】ルックアップ先が見つからず、全てのルックアップフィールドを削除しました。');
        }
    }

    // ================================================================================
    // パブリックメソッド - モジュール確定処理
    // ================================================================================

    /**
     * 優先順位に基づいてレコードにモジュールとIDを割り当てる
     *
     * __PENDING__レコードを実際のモジュール（Contacts or Leads）に確定する
     *
     * 【処理フロー】
     * 1. Contactsで検索 → 存在すれば Contacts/update
     * 2. Leadsで検索 → 存在すれば Leads/update
     * 3. どちらにも存在しなければ Leads/insert
     *
     * @param mixed $apiRecordHandler RecordApiのインスタンス
     * @param RecordModel[] $records __PENDING__を含むレコード配列
     * @return void レコードオブジェクトを直接更新
     */
    public function assignModuleByPriority($apiRecordHandler, array $records)
    {
        $modulePriority = $this->modulePriority;

        // 優先順位設定がない場合は何もしない
        if (empty($modulePriority)) {
            return;
        }

        foreach ($records as $record) {
            // __PENDING__でないレコードはスキップ
            if ($record->getModuleApiName() !== '__PENDING__') {
                continue;
            }

            // グループインデックスを取得
            $groupIndex = $record->groupIndex ?? 0;
            $insertScopes = $this->getInsertScopes($groupIndex);
            $updateScopes = $this->getUpdateScopes($groupIndex);
            $uniqueKey = $this->getUniqueKey($groupIndex);
            $uniqueValue = $record->getField($uniqueKey);

            if (empty($uniqueValue)) {
                // uniqueKey値がない場合は最初のinsertScopeモジュールでinsertとする
                $firstInsertModule = !empty($insertScopes) ? $insertScopes[0] : $modulePriority[0];
                $this->updateRecordProperties($record, $firstInsertModule, 'insert', null);
                continue;
            }

            $assigned = false;

            // modulePriorityの順序に従って検索
            foreach ($modulePriority as $moduleName) {
                if ($assigned) {
                    break;
                }

                // updateScopeに含まれている場合は既存レコードを検索
                if (in_array($moduleName, $updateScopes)) {
                    $existingRecord = $apiRecordHandler->searchByUniqueKey($moduleName, $uniqueKey, $uniqueValue);
                    if ($existingRecord) {
                        $this->updateRecordProperties($record, $moduleName, 'update', $existingRecord['id']);
                        $assigned = true;
                    }
                }
            }

            // どのモジュールにも存在しない場合は、insertScopeの最初のモジュールでinsert
            if (!$assigned && !empty($insertScopes)) {
                $this->updateRecordProperties($record, $insertScopes[0], 'insert', null);
            }
        }
    }

    /**
     * RecordModelのモジュール、タイプ、IDを更新
     *
     * @param RecordModel $record 更新対象のレコード
     * @param string $moduleApiName モジュールAPI名
     * @param string $type insert or update
     * @param string|null $id レコードID（updateの場合）
     * @return void
     */
    private function updateRecordProperties(RecordModel $record, string $moduleApiName, string $type, ?string $id)
    {
        $record->setModuleApiName($moduleApiName);
        $record->setType($type);

        if ($id) {
            $record->setId($id);
        }

        // モジュールが確定したので、このモジュールに不要なフィールドを削除
        $this->cleanupFieldsForModule($record, $moduleApiName, $type);
    }

    /**
     * モジュールに不要なフィールドを削除
     *
     * @param RecordModel $record レコード
     * @param string $moduleApiName モジュールAPI名
     * @param string $type insert or update
     * @return void
     */
    private function cleanupFieldsForModule(RecordModel $record, string $moduleApiName, string $type)
    {
        $fieldKeys = $this->config->getArray('zoho_link_field_module_field');
        $currentFields = $record->getFields();

        foreach ($fieldKeys as $i => $fieldKey) {
            // fieldKeyがJSON形式の場合はデコード
            $fieldApiName = $fieldKey;
            if ($this->isJson($fieldKey)) {
                $fieldData = json_decode($fieldKey, true);
                $fieldApiName = $fieldData['apiName'] ?? $fieldKey;
            }

            // このフィールドが対象モジュールに送信されるべきか確認
            $scopesJson = $this->config->get('zoho_link_field_module', '', $i);
            $moduleScopes = ModuleScope::parseJsonArray($scopesJson);
            $scopes = ModuleScope::toApiNames($moduleScopes);

            $canInsert = $this->config->get('zoho_link_field_insert', '', $i);
            $canUpdate = $this->config->get('zoho_link_field_update', '', $i);

            // スコープが一致しない場合、このフィールドを削除
            if (!in_array($moduleApiName, $scopes)) {
                if ($record->hasField($fieldApiName)) {
                    $record->removeField($fieldApiName);
                }
                continue;
            }

            // 操作タイプに応じた権限チェック
            $isAllowed = ($type === 'insert' && $canInsert) || ($type === 'update' && $canUpdate);
            if (!$isAllowed && $record->hasField($fieldApiName)) {
                $record->removeField($fieldApiName);
            }
        }
    }

    /**
     * 文字列がJSON形式かどうかを判定
     *
     * @param string $string 判定する文字列
     * @return bool JSON形式の場合true
     */
    private function isJson(string $string): bool
    {
        if (empty($string)) {
            return false;
        }
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
