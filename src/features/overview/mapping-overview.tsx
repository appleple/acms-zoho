import { useCallback, useMemo, useState } from 'react';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';
import { useModulesSWR } from '../../hooks/use-modules-swr';
import {
  buildMappingOverview,
  parseModulesJson,
  type SendRuleGroup,
  type FieldMapping,
  type RequiredFieldsByModule,
  type MappingAction,
} from '../../utils';

// zoho_link_field_module_field は {apiName, fieldName, dataType} のJSON。apiName だけ取り出す。
const parseFieldApiName = (value: string): string => {
  if (!value) return '';
  try {
    const parsed = JSON.parse(value);
    return parsed.apiName || '';
  } catch {
    return value;
  }
};

// item-template（行追加用の雛形）は集計対象から除外する。
const isTemplateRow = (el: Element): boolean => !!el.closest('.item-template');

const collectSendRules = (): SendRuleGroup[] => {
  const rows = document.querySelectorAll('#js-acms-zoho-unique-key .js-acms-zoho-unique-key-row');
  return [...rows]
    .filter(row => !isTemplateRow(row))
    .map(row => {
      const insert = row.querySelector('[data-acms-zoho-unique-key-insert-scope]') as HTMLInputElement | null;
      const update = row.querySelector('[data-acms-zoho-unique-key-update-scope]') as HTMLInputElement | null;
      const key = row.querySelector('[data-acms-zoho-unique-key-value]') as HTMLInputElement | null;
      return {
        insertScopes: parseModulesJson(insert?.value || '').map(m => m.apiName),
        updateScopes: parseModulesJson(update?.value || '').map(m => m.apiName),
        uniqueKey: key?.value || '',
      };
    });
};

const collectFieldMappings = (): FieldMapping[] => {
  const rows = document.querySelectorAll('#js-acms-zoho-link-field .js-acms-zoho-link-field-row');
  return [...rows]
    .filter(row => !isTemplateRow(row))
    .map(row => {
      const moduleInput = row.querySelector('[data-acms-zoho-link-field-module]') as HTMLInputElement | null;
      const fieldInput = row.querySelector('[data-acms-zoho-link-field-module-field]') as HTMLInputElement | null;
      const tr = row.closest('tr');
      const insertCb = tr?.querySelector('input[name^="zoho_link_field_insert"]') as HTMLInputElement | null;
      const updateCb = tr?.querySelector('input[name^="zoho_link_field_update"]') as HTMLInputElement | null;
      return {
        moduleApiNames: parseModulesJson(moduleInput?.value || '').map(m => m.apiName),
        fieldApiName: parseFieldApiName(fieldInput?.value || ''),
        insert: insertCb?.checked ?? false,
        update: updateCb?.checked ?? false,
      };
    });
};

const actionLabel: Record<MappingAction, string> = {
  insert: '追加',
  update: '更新',
  upsert: '追加/更新',
};
const actionClassName: Record<MappingAction, string> = {
  insert: 'acms-admin-label-success',
  update: 'acms-admin-label-info',
  upsert: 'acms-admin-label-warning',
};

/**
 * 送信ルールとフィールドマッピングの現在値を集計して、送信先タブ単位のカードを表示する。
 * アイランド分離のため編集への自動追随はせず、「最新の設定で更新」ボタンで再集計する。
 */
export const MappingOverview = () => {
  const [snapshot, setSnapshot] = useState(() => ({
    groups: collectSendRules(),
    mappings: collectFieldMappings(),
  }));

  const moduleApiNames = useMemo(() => {
    const set = new Set<string>();
    snapshot.groups.forEach(g => {
      g.insertScopes.forEach(m => m && set.add(m));
      g.updateScopes.forEach(m => m && set.add(m));
    });
    return [...set];
  }, [snapshot]);

  const { fieldsResults } = useModuleFieldsSWR(moduleApiNames);
  const { modules } = useModulesSWR();

  const requiredByModule = useMemo<RequiredFieldsByModule>(() => {
    const result: RequiredFieldsByModule = {};
    moduleApiNames.forEach((name, i) => {
      const fields = fieldsResults[i]?.data || [];
      result[name] = fields
        .filter(f => f.required)
        .map(f => ({ apiName: f.apiName, fieldName: f.fieldName }));
    });
    return result;
  }, [moduleApiNames, fieldsResults]);

  const overview = useMemo(
    () => buildMappingOverview(snapshot.groups, snapshot.mappings, requiredByModule),
    [snapshot, requiredByModule]
  );

  const labelOf = useCallback(
    (apiName: string) => modules.find(m => m.apiName === apiName)?.singularLabel || apiName,
    [modules]
  );

  const refresh = useCallback(() => {
    setSnapshot({ groups: collectSendRules(), mappings: collectFieldMappings() });
  }, []);

  return (
    <div className="acms-admin-panel acms-admin-mb-3">
      <div className="acms-admin-panel-header acms-admin-d-flex acms-admin-align-items-center acms-admin-justify-content-between">
        <h3 className="acms-admin-panel-title acms-admin-m-0">マッピング概要</h3>
        <button type="button" className="acms-admin-btn-admin" onClick={refresh}>
          最新の設定で更新
        </button>
      </div>
      <div className="acms-admin-panel-body">
        {overview.length === 0 ? (
          <p className="acms-admin-m-0">
            送信ルールが未設定です。下の「送信ルール」でタブを追加してください。
          </p>
        ) : (
          <div className="acms-admin-cssgrid">
            {overview.map(o => (
              <div key={o.moduleApiName} className="acms-admin-g-col-12 acms-admin-g-col-md-4">
                <div className="acms-admin-panel acms-admin-m-0">
                  <div className="acms-admin-panel-body">
                    <div className="acms-admin-mb-2">
                      <strong>{labelOf(o.moduleApiName)}</strong>
                      <span className={`acms-admin-label acms-admin-ms-1 ${actionClassName[o.action]}`}>
                        {actionLabel[o.action]}
                      </span>
                    </div>
                    <div className="acms-admin-d-flex acms-admin-justify-content-between">
                      <span>マップ済み項目</span>
                      <strong>{o.mappedCount}</strong>
                    </div>
                    <div className="acms-admin-d-flex acms-admin-justify-content-between acms-admin-mt-1">
                      <span>必須の充足</span>
                      {o.unmetRequired.length === 0 ? (
                        <span className="acms-admin-label acms-admin-label-success">
                          ✓ {o.metRequired.length}/{o.requiredFields.length}
                        </span>
                      ) : (
                        <span className="acms-admin-label acms-admin-label-warning">
                          ⚠ {o.metRequired.length}/{o.requiredFields.length}
                        </span>
                      )}
                    </div>
                    {o.unmetRequired.length > 0 && (
                      <div className="acms-admin-text-danger acms-admin-mt-2">
                        未マップの必須: {o.unmetRequired.map(f => f.fieldName).join(' / ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
