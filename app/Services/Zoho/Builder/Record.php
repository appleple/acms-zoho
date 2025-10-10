<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Builder;

use Field;
use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Builder;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record as RecordModel;
use Acms\Plugins\Zoho\Services\Zoho\Models\ModuleScope;
use Acms\Plugins\Zoho\Services\Zoho\Builder\ProcessedRecordsCollection;

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

    // ================================================================================
    // パブリックメソッド - レコード生成
    // ================================================================================

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
        $modules = array_keys($grouped);

        foreach ($modules as $module) {
            $this->topologicalSortVisit($module, $dependencies, $grouped, $visited, $sorted);
        }

        return $sorted;
    }

    /**
     * トポロジカルソートの訪問処理（深さ優先探索）
     *
     * @param string $module モジュール名
     * @param array $dependencies 依存関係マップ
     * @param array $grouped モジュールごとにグループ化されたレコード
     * @param array $visited 訪問済みフラグ
     * @param array $sorted ソート結果（参照渡し）
     */
    private function topologicalSortVisit(string $module, array $dependencies, array $grouped, array &$visited, array &$sorted)
    {
        // 既に訪問済みの場合はスキップ
        if (isset($visited[$module])) {
            return;
        }

        $visited[$module] = true;

        // 依存先を先に処理
        if (isset($dependencies[$module])) {
            foreach ($dependencies[$module] as $dependency) {
                if (isset($grouped[$dependency])) {
                    $this->topologicalSortVisit($dependency, $dependencies, $grouped, $visited, $sorted);
                }
            }
        }

        // このモジュールのレコードを追加
        if (isset($grouped[$module])) {
            $sorted = array_merge($sorted, $grouped[$module]);
        }
    }

    // ================================================================================
    // プライベートメソッド - レコード生成処理
    // ================================================================================

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

    // ================================================================================
    // プライベートメソッド - フィールドマッピング
    // ================================================================================

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
                AcmsLogger::debug('【Zoho Debug】ルックアップフィールドとしてマーク', [
                    'module' => $scope,
                    'fieldApiName' => $fieldApiName,
                    'fieldType' => $fieldType,
                    'fieldKey' => $fieldKey
                ]);
            }

            // ピックリストフィールドの判定と登録
            if ($fieldType === 'picklist' || $fieldType === 'multiselectpicklist') {
                $record->markAsPicklistField($fieldApiName);
            }

            $item[$fieldApiName] = $normalizedValue;
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

    // ================================================================================
    // プライベートメソッド - 設定取得ヘルパー
    // ================================================================================

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
     * @return array ルックアップ設定の配列 [['lookupId' => '', 'targetScope' => '', 'compareField' => ''], ...]
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
                'compareField' => $this->config->get('zoho_related_compare_field', '', $i)
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
            usort($lookupCandidates, function($a, $b) {
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
     * RecordModelのprivateプロパティをリフレクションで更新
     *
     * @param RecordModel $record 更新対象のレコード
     * @param string $moduleApiName モジュールAPI名
     * @param string $type insert or update
     * @param string|null $id レコードID（updateの場合）
     * @return void
     */
    private function updateRecordProperties(RecordModel $record, string $moduleApiName, string $type, ?string $id)
    {
        // リフレクションを使ってprivateプロパティを更新
        $reflection = new \ReflectionClass($record);

        $moduleProperty = $reflection->getProperty('moduleApiName');
        $moduleProperty->setAccessible(true);
        $moduleProperty->setValue($record, $moduleApiName);

        $typeProperty = $reflection->getProperty('type');
        $typeProperty->setAccessible(true);
        $typeProperty->setValue($record, $type);

        if ($id) {
            $record->setId($id);
        }
    }

    // ================================================================================
    // 未使用メソッド（コメントアウト）
    // ================================================================================

    /**
     * RecordModelにフィールドデータをマッピングして追加
     *
     * グループフィールド（繰り返しフィールド）が存在する場合、
     * その最大件数分のレコードを生成する
     * 例: 商品名が3件入力されていれば、3つのRecordModelを生成
     *
     * @param RecordModel[] $records フィールドを追加する前のレコード
     * @return RecordModel[] フィールドが追加された新しいレコード配列
     */
    // public function attachFieldsToRecords(array $records)
    // {
    //     $attachedRecords = [];

    //     foreach ($records as $record) {
    //         $groupArr = $this->getGroupArray($record);
    //         $length = $groupArr ? $this->getMaxCount($groupArr) : 1;

    //         for ($cnt = 0; $cnt < $length; $cnt++) {
    //             $mappedFields = $this->mapFields($record, $groupArr, $cnt);

    //             // 新しいレコードを作成してフィールドをコピー
    //             $newRecord = new RecordModel(
    //                 $record->getModuleApiName(),
    //                 $record->getType(),
    //                 $record->getUniqueKey()
    //             );

    //             $newRecord->addFields($mappedFields);

    //             if ($record->getId()) {
    //                 $newRecord->setId($record->getId());
    //             }

    //             // groupIndexをコピー
    //             if (isset($record->groupIndex)) {
    //                 $newRecord->groupIndex = $record->groupIndex;
    //             }

    //             // 比較フィールドの値を保存（リレーション処理用）
    //             $compareFieldValue = $this->getCompareFieldValue($record, $groupArr, $cnt);
    //             if ($compareFieldValue !== null) {
    //                 $newRecord->compareFieldValue = $compareFieldValue;
    //             }

    //             $attachedRecords[] = $newRecord;
    //         }
    //     }

    //     return $attachedRecords;
    // }

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

    /**
     * グループフィールド（繰り返しフィールド）のキー配列を取得
     *
     * zoho_field_cms_key が "@" で始まるフィールドを探し、
     * 対象モジュール・操作タイプに一致するものを返す
     *
     * @param RecordModel $record 対象レコード
     * @return array|null グループフィールドのキー配列、存在しない場合はnull
     */
    // private function getGroupArray(RecordModel $record)
    // {
    //     $zohoScope = $record->getModuleApiName();
    //     $type = $record->getType();
    //     $keys = $this->config->getArray('zoho_field_cms_key');

    //     foreach ($keys as $i => $key) {
    //         $scopes = $this->config->get('zoho_field_scope', '', $i);
    //         $insert = $this->config->get('zoho_field_insert', '', $i);
    //         $update = $this->config->get('zoho_field_update', '', $i);

    //         if ($type === 'insert' && !$insert) {
    //             continue;
    //         }
    //         if ($type === 'update' && !$update) {
    //             continue;
    //         }

    //         $scopes = explode(',', $scopes);
    //         foreach ($scopes as $scope) {
    //             if ($scope === $zohoScope) {
    //                 if (isset($key) && isset($key[0]) && $key[0] === '@') {
    //                     return $this->field->getArray($key);
    //                 }
    //             }
    //         }
    //     }

    //     return null;
    // }

    /**
     * グループフィールド内で最も要素数が多いフィールドの件数を取得
     *
     * @param array $keys グループフィールドのキー配列
     * @return int 最大件数
     */
    // private function getMaxCount(array $keys)
    // {
    //     $max = 1;
    //     foreach ($keys as $key) {
    //         $arr = $this->field->getArray($key);
    //         $cnt = count($arr);
    //         if ($cnt > $max) {
    //             $max = $cnt;
    //         }
    //     }
    //     return $max;
    // }

    /**
     * タイプでレコードをフィルタリング
     *
     * @param RecordModel[] $records
     * @param string $type insert or update
     * @return RecordModel[]
     */
    public function filterRecordsByType(array $records, string $type)
    {
        return array_values(array_filter($records, function (RecordModel $record) use ($type) {
            return $record->getType() === $type;
        }));
    }

    /**
     * 優先順位に基づいてレコードにモジュールとIDを割り当てる
     *
     * Contacts/Leadsの優先処理:
     * - ContactsにuniqueKeyで検索 → 存在すればContactsでupdate
     * - 存在しなければLeadsにuniqueKeyで検索 → 存在すればLeadsでupdate
     * - 両方に存在しなければ、Leadsでinsert
     *
     * その他のモジュール（Samples等）:
     * - insertScopeとupdateScopeの通常処理
     *
     * @param RecordModel[] $records
     * @param mixed $apiRecordHandler RecordApiのインスタンス
     * @return RecordModel[]
     */
    // public function assignModuleByPriority(array $records, $apiRecordHandler)
    // {
    //     $modulePriority = $this->modulePriority; // ['Contacts', 'Leads']

    //     // 優先順位設定がない場合はそのまま返す
    //     if (empty($modulePriority)) {
    //         return $records;
    //     }

    //     $processedRecords = [];

    //     foreach ($records as $record) {
    //         $assigned = false;

    //         // グループインデックスを取得（プロパティに保存されている）
    //         $groupIndex = isset($record->groupIndex) ? $record->groupIndex : 0;

    //         $insertScopes = $this->getInsertScopes($groupIndex);
    //         $updateScopes = $this->getUpdateScopes($groupIndex);
    //         $uniqueKey = $this->getUniqueKey($groupIndex);

    //         // Contacts/Leadsの優先処理
    //         // ContactsまたはLeadsがinsert/updateScopeに含まれている場合のみ優先処理を実行
    //         $hasContactsOrLeads =
    //             in_array('Contacts', array_merge($insertScopes, $updateScopes)) ||
    //             in_array('Leads', array_merge($insertScopes, $updateScopes));

    //         if ($hasContactsOrLeads) {
    //             $uniqueValue = $record->getField($uniqueKey);

    //             if (!empty($uniqueValue)) {
    //                 // 1. Contactsに存在するか確認（updateScopeに含まれている場合のみ）
    //                 if (in_array('Contacts', $updateScopes)) {
    //                     $existingRecord = $apiRecordHandler->searchByUniqueKey('Contacts', $uniqueKey, $uniqueValue);

    //                     if ($existingRecord) {
    //                         // Contactsに存在 → Contactsでupdate
    //                         $newRecord = new RecordModel('Contacts', 'update', '');
    //                         $newRecord->addFields($record->getFields());
    //                         $newRecord->setId($existingRecord['id']);
    //                         $processedRecords[] = $newRecord;
    //                         $assigned = true;
    //                     }
    //                 }

    //                 // 2. Contactsに見つからなかった場合、Leadsを確認
    //                 if (!$assigned && (in_array('Leads', $updateScopes) || in_array('Leads', $insertScopes))) {
    //                     $existingLeadRecord = null;

    //                     if (in_array('Leads', $updateScopes)) {
    //                         $existingLeadRecord = $apiRecordHandler->searchByUniqueKey('Leads', $uniqueKey, $uniqueValue);
    //                     }

    //                     if ($existingLeadRecord) {
    //                         // Leadsに存在 → Leadsでupdate
    //                         $newRecord = new RecordModel('Leads', 'update', '');
    //                         $newRecord->addFields($record->getFields());
    //                         $newRecord->setId($existingLeadRecord['id']);
    //                         $processedRecords[] = $newRecord;
    //                         $assigned = true;
    //                     } elseif (in_array('Leads', $insertScopes)) {
    //                         // Leadsにも存在しない → Leadsでinsert
    //                         $newRecord = new RecordModel('Leads', 'insert', '');
    //                         $newRecord->addFields($record->getFields());
    //                         $processedRecords[] = $newRecord;
    //                         $assigned = true;
    //                     }
    //                 }
    //             }
    //         }

    //         // 優先処理で割り当てられなかった場合、その他のモジュールを通常処理
    //         if (!$assigned) {
    //             $uniqueValue = $record->getField($uniqueKey);

    //             // insertScopeとupdateScopeの両方に含まれるモジュールを処理
    //             foreach ($insertScopes as $insertScope) {
    //                 if (in_array($insertScope, $modulePriority)) {
    //                     continue; // Contacts/Leadsはスキップ
    //                 }

    //                 // updateScopeにも含まれている場合、既存レコードを検索
    //                 if (in_array($insertScope, $updateScopes) && !empty($uniqueValue)) {
    //                     $existingRecord = $apiRecordHandler->searchByUniqueKey($insertScope, $uniqueKey, $uniqueValue);

    //                     if ($existingRecord) {
    //                         // 既存レコードあり → update
    //                         $newRecord = new RecordModel($insertScope, 'update', '');
    //                         $newRecord->addFields($record->getFields());
    //                         $newRecord->setId($existingRecord['id']);
    //                         $processedRecords[] = $newRecord;
    //                     } else {
    //                         // 既存レコードなし → insert
    //                         $newRecord = new RecordModel($insertScope, 'insert', '');
    //                         $newRecord->addFields($record->getFields());
    //                         $processedRecords[] = $newRecord;
    //                     }
    //                 } else {
    //                     // insertScopeのみ → insert
    //                     $newRecord = new RecordModel($insertScope, 'insert', '');
    //                     $newRecord->addFields($record->getFields());
    //                     $processedRecords[] = $newRecord;
    //                 }
    //             }

    //             // updateScopeのみに含まれるモジュールを処理（insertScopeに含まれない）
    //             foreach ($updateScopes as $updateScope) {
    //                 if (in_array($updateScope, $insertScopes) || in_array($updateScope, $modulePriority)) {
    //                     continue; // 既に処理済み、またはContacts/Leads
    //                 }

    //                 $newRecord = new RecordModel($updateScope, 'update', '');
    //                 $newRecord->addFields($record->getFields());

    //                 // uniqueKeyで既存レコードを検索してIDを設定
    //                 if (!empty($uniqueValue)) {
    //                     $existingRecord = $apiRecordHandler->searchByUniqueKey($updateScope, $uniqueKey, $uniqueValue);

    //                     if ($existingRecord) {
    //                         $newRecord->setId($existingRecord['id']);
    //                     }
    //                 }

    //                 $processedRecords[] = $newRecord;
    //             }
    //         }
    //     }

    //     return $processedRecords;
    // }

    /**
     * 比較フィールドの値を取得
     *
     * リレーショナル設定で比較に使うフィールドの値を取得する
     *
     * @param RecordModel $record 対象レコード
     * @param array|null $groupArr グループフィールドのキー配列
     * @param int $index グループフィールドのインデックス
     * @return mixed|null 比較フィールドの値、設定がない場合はnull
     */
    // private function getCompareFieldValue(RecordModel $record, ?array $groupArr, int $index)
    // {
    //     $zohoRelatedScopes = $this->config->getArray('zoho_related_scope');
    //     $moduleApiName = $record->getModuleApiName();

    //     foreach ($zohoRelatedScopes as $i => $relatedScope) {
    //         $targetScope = $this->config->get('zoho_related_target_scope', '', $i);

    //         // このレコードが関連元または関連先に該当するか確認
    //         if ($relatedScope === $moduleApiName || $targetScope === $moduleApiName) {
    //             $compareField = $this->config->get('zoho_related_compare_field', '', $i);

    //             if ($compareField) {
    //                 return $this->getFieldValue($compareField, $groupArr, $index);
    //             }
    //         }
    //     }

    //     return null;
    // }

    /**
     * ルックアップフィールドを処理してレコードに追加
     *
     * リレーショナル設定に基づき、比較フィールドの値が一致する
     * 関連先レコードのIDをルックアップフィールドにセットする
     *
     * @param RecordModel[] $records 処理対象のレコード配列
     * @param ProcessedRecordsCollection $processedRecords 処理済みレコードのコレクション
     * @return RecordModel[] ルックアップフィールドが追加されたレコード配列
     */
    // public function attachLookupFields(array $records, ProcessedRecordsCollection $processedRecords)
    // {
    //     $zohoRelatedScopes = $this->config->getArray('zoho_related_scope');

    //     foreach ($records as $record) {
    //         $moduleApiName = $record->getModuleApiName();

    //         // このモジュールのリレーショナル設定を探す
    //         foreach ($zohoRelatedScopes as $i => $relatedScope) {
    //             // 関連元モジュールでない場合はスキップ
    //             if ($relatedScope !== $moduleApiName) {
    //                 continue;
    //             }

    //             $targetScope = $this->config->get('zoho_related_target_scope', '', $i);
    //             $lookupId = $this->config->get('zoho_related_lookup_id', '', $i);
    //             $compareField = $this->config->get('zoho_related_compare_field', '', $i);

    //             // ルックアップIDが設定されていない場合はスキップ（ジャンクションレコード）
    //             if (!$lookupId) {
    //                 continue;
    //             }

    //             // 比較フィールドの値を取得
    //             $compareValue = $record->compareFieldValue ?? null;
    //             if (!$compareValue) {
    //                 continue;
    //             }

    //             // 関連先レコードのIDを取得
    //             $targetRecordId = $processedRecords->getIdByCompareValue($targetScope, $compareValue);
    //             if ($targetRecordId) {
    //                 // ルックアップフィールドにIDをセット
    //                 $record->addField($lookupId, $targetRecordId);
    //                 // ルックアップフィールドとしてマーク
    //                 $record->markAsLookupField($lookupId);
    //             }
    //         }
    //     }

    //     return $records;
    // }

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
