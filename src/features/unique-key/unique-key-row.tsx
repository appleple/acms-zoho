import { useCallback, useEffect, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import { ModuleSelect } from '../../components/module-select/module-select';
import CreatableSelect from '../../components/rich-select/creatable-select';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';
import { ModuleWithFields } from '../../types';
import { parseModulesJson, resolveAction, type MappingAction } from '../../utils';

const actionMeta: Record<MappingAction, { label: string; className: string }> = {
  insert: { label: '追加のみ', className: 'acms-admin-label-success' },
  update: { label: '更新のみ', className: 'acms-admin-label-info' },
  upsert: { label: '追加＋更新', className: 'acms-admin-label-warning' },
};

// ラベル横のツールチップ。本体JSが有効なら data-acms-tooltip、無効でも title でフォールバックする。
const LabelTooltip = ({ text }: { text: string }) => (
  <i
    className="acms-admin-icon-tooltip js-acms-tooltip js-acms-tooltip-hover acms-admin-ms-1"
    data-acms-tooltip={text}
    title={text}
  />
);

interface KeyOption {
  value: string;
  label: string;
  unique?: boolean;
}

interface Props {
  // 呼び出し元（dispatch-unique-key.tsx）が発番する、ページ全体で一意な行ID。
  // 各行は独立した React root として個別に mount されるため、React の useId() は
  // ルートをまたいだ一意性を持たず行ごとに同じ値を返してしまう（複数行でラベルのfor/idが衝突する）。
  rowId: string | number;
  insertInputRef: HTMLInputElement;
  updateInputRef: HTMLInputElement;
  uniqueKeyInputRef: HTMLInputElement;
  insertValue: string;
  updateValue: string;
  uniqueKeyValue: string;
}

/**
 * 送信ルール1行。追加タブ・更新タブ（各複数可）と重複判定キーを指定する。
 * 選択内容から「動作」と「このルールが何をするか」の自然文サマリをリアルタイムに表示する。
 * 保存されるデータ（3つのhiddenのname/値）は現行と同一。
 */
export const UniqueKeyRow = ({
  rowId,
  insertInputRef,
  updateInputRef,
  uniqueKeyInputRef,
  insertValue,
  updateValue,
  uniqueKeyValue,
}: Props) => {
  const [insertModules, setInsertModules] = useState<ModuleWithFields[]>(() => parseModulesJson(insertValue));
  const [updateModules, setUpdateModules] = useState<ModuleWithFields[]>(() => parseModulesJson(updateValue));
  const [uniqueKey, setUniqueKey] = useState<string>(uniqueKeyValue);

  // ラベルと react-select 内部 input を紐付けるための一意な id（行ごとに一意）。
  const baseId = `zoho-unique-key-row-${rowId}`;
  const insertId = `${baseId}-insert`;
  const updateId = `${baseId}-update`;
  const keyId = `${baseId}-key`;

  const action = resolveAction(insertModules.length > 0, updateModules.length > 0);
  const insertOnly = action === 'insert';

  // insert/update スコープの全タブから重複判定キーの候補を集める。
  const allModuleApiNames = useMemo(
    () => [...new Set([...insertModules, ...updateModules].map(m => m.apiName))],
    [insertModules, updateModules]
  );

  const { fieldsResults } = useModuleFieldsSWR(allModuleApiNames);

  // 選択タブに共通して存在する項目のみを候補にし、unique を優先表示する。
  const keyOptions = useMemo<KeyOption[]>(() => {
    const lists = fieldsResults.map(r => r.data || []);
    if (lists.length === 0 || lists.some(list => list.length === 0)) return [];
    const common = lists[0].filter(f => lists.every(list => list.some(x => x.apiName === f.apiName)));
    return common
      .map(f => ({ value: f.apiName, label: f.fieldName, unique: f.unique }))
      .sort((a, b) => Number(Boolean(b.unique)) - Number(Boolean(a.unique)));
  }, [fieldsResults]);

  // 既存の自由入力値は候補に無くても保持する（後方互換）。
  const selectedKeyOption = useMemo<KeyOption | null>(() => {
    if (!uniqueKey) return null;
    return keyOptions.find(o => o.value === uniqueKey) || { value: uniqueKey, label: uniqueKey };
  }, [uniqueKey, keyOptions]);

  const handleKeyChange = useCallback(
    (opt: SingleValue<KeyOption>) => {
      const value = opt?.value || '';
      setUniqueKey(value);
      uniqueKeyInputRef.value = value;
    },
    [uniqueKeyInputRef]
  );

  // 「追加のみ」では重複判定キーは送信処理で使われないため、常に空へ整合させる。
  // 初回読み込み時の「追加のみ＋キーあり」（使われないゴミ値）も掃除する。挿入挙動は変わらない。
  useEffect(() => {
    if (insertOnly && uniqueKey) {
      setUniqueKey('');
      uniqueKeyInputRef.value = '';
    }
  }, [insertOnly, uniqueKey, uniqueKeyInputRef]);

  // A. 選択内容から「このルールが何をするか」を自然文で組み立てる。
  const summary = useMemo(() => {
    const insNames = insertModules.map(m => m.singularLabel).join('・');
    const updNames = updateModules.map(m => m.singularLabel).join('・');
    const key = uniqueKey || 'Email';
    if (allModuleApiNames.length === 0) {
      return '対象タブを選ぶと、この設定でどう動くかがここに表示されます。';
    }
    if (action === 'insert') {
      return `送信成功時に「${insNames}」へ新規レコードを作成します。`;
    }
    if (action === 'update') {
      return `「${key}」が一致する「${updNames}」の既存レコードを更新します（見つからなければ何もしません）。`;
    }
    return `「${key}」で「${updNames}」の既存レコードを探し、レコードが存在すれば更新・そうでなければ「${insNames}」へ新規作成します。`;
  }, [action, insertModules, updateModules, uniqueKey, allModuleApiNames]);

  // C. 更新・upsert なのに重複判定キー未指定＝既存を正しく探せない可能性を警告。
  const showKeyWarning = !insertOnly && !uniqueKey && allModuleApiNames.length > 0;

  return (
    <div className="acms-admin-py-1">
      <div className="acms-admin-mb-1">
        <span className="acms-admin-me-2">このルールで行われること</span>
        <span className={`acms-admin-label ${actionMeta[action].className}`}>{actionMeta[action].label}</span>
      </div>
      <p className="acms-admin-mt-1 acms-admin-mb-2 acms-admin-text-info">💡 {summary}</p>

      <div className="acms-admin-cssgrid">
        <div className="acms-admin-g-col-12 acms-admin-g-col-md-4 acms-admin-mb-2">
          <label htmlFor={insertId} className="acms-admin-form-block acms-admin-mb-1">
            追加するZohoタブ<LabelTooltip text="新規レコードを作成するタブ（複数可）。例：見込み客" />
          </label>
          <ModuleSelect
            inputId={insertId}
            defaultValue={insertValue}
            originalInputRef={insertInputRef}
            onChange={setInsertModules}
          />
        </div>

        <div className="acms-admin-g-col-12 acms-admin-g-col-md-4 acms-admin-mb-2">
          <label htmlFor={updateId} className="acms-admin-form-block acms-admin-mb-1">
            更新するZohoタブ<LabelTooltip text="既存レコードがあれば更新するタブ（複数可）。追加タブと同じにすると追加＋更新(upsert)。見込み客・連絡先だけは特別に、両方を入れるとどちらかにいる人を見つけて更新し重複登録を防げます（それ以外のタブの組み合わせでは、指定した各タブへ個別に更新を試みるだけで重複は防げません）。" />
          </label>
          <ModuleSelect
            inputId={updateId}
            defaultValue={updateValue}
            originalInputRef={updateInputRef}
            onChange={setUpdateModules}
          />
        </div>

        <div className="acms-admin-g-col-12 acms-admin-g-col-md-4 acms-admin-mb-2">
          <label htmlFor={keyId} className="acms-admin-form-block acms-admin-mb-1">
            同じレコードと判断する項目<LabelTooltip text="更新・upsert時に既存レコードを探すキー。例：Email" />
          </label>
          {/* 候補一覧にないAPI名（未取得のカスタムフィールドや過去保存値）も直接指定できるよう、
              候補選択のみの rich-select ではなく自由入力可能な CreatableSelect を使用している。 */}
          <CreatableSelect<KeyOption, false>
            inputId={keyId}
            isClearable
            value={selectedKeyOption}
            onChange={handleKeyChange}
            options={keyOptions}
            isDisabled={insertOnly || allModuleApiNames.length === 0}
            placeholder={insertOnly ? '追加のみのため使用しません' : '項目を選択（自由入力も可）'}
            formatOptionLabel={(option) => (
              <span>
                {option.label}
                {option.unique && <span className="acms-admin-label acms-admin-label-success acms-admin-ms-1">重複不可</span>}
              </span>
            )}
            noOptionsMessage={() => 'タブを選択すると候補が表示されます'}
            formatCreateLabel={(input) => `「${input}」をAPI名として使う`}
          />
          {showKeyWarning && (
            <p className="acms-admin-mt-1 acms-admin-text-warning">
              更新には「同じレコードと判断する項目」の指定をおすすめします（未指定の場合は Email で判定します）。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
