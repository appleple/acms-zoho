import { Module, ModuleWithFields } from '../types';

/**
 * CSRF トークンを取得する。
 * 本体JS(js/dest/index.js)が window.csrfToken へ代入するが、読み込み順序により
 * 未代入のことがあるため、meta[name="csrf-token"] からの直接取得をフォールバックにする。
 */
export const getCsrfToken = (): string => {
  if (window.csrfToken) {
    return window.csrfToken;
  }
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta?.getAttribute('content') || '';
};

/**
 * POST 先の URL を取得する。
 * POST アクションは対象ブログ(BID)を URL から特定するため、現在のブログを指す URL を返す。
 * 本体の流儀に合わせ `${root}bid/${bid}/` を組み立てる。管理画面では ACMS.Config が
 * 空のことがあるため、その場合は現在ページ(= 現在ブログ)の location.href をフォールバックにする。
 */
export const getRootUrl = (): string => {
  const root = window.ACMS?.Config?.root;
  const bid = window.ACMS?.Config?.bid;

  if (root && bid) {
    return `${root}bid/${bid}/`;
  }
  if (root) {
    return root;
  }
  // ACMS.Config が利用できない場合は、現在表示中のページ(= 現在ブログ)へ投げる
  return window.location.href;
};

/**
 * JSON文字列をModule配列にパースし、ModuleWithFields[]として返す
 */
export const parseModulesJson = (value: string): ModuleWithFields[] => {
  if (!value) return [];
  try {
    const parsed: Module[] = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(m => ({
      apiName: m.apiName,
      moduleName: m.moduleName || '',
      singularLabel: m.singularLabel || m.apiName,
    }));
  } catch {
    return [];
  }
};

// ---- 送信ルール／フィールドマッピングの集計（概要パネル・必須未マップ警告の土台） ----

/** 送信ルール1グループ（zoho_form_insert_scope / update_scope / unique_key に対応） */
export interface SendRuleGroup {
  insertScopes: string[];
  updateScopes: string[];
  uniqueKey: string;
}

/** フィールドマッピング1行（zoho_link_field_* に対応） */
export interface FieldMapping {
  moduleApiNames: string[];
  fieldApiName: string;
  insert: boolean;
  update: boolean;
}

export interface RequiredField {
  apiName: string;
  fieldName: string;
}

export type RequiredFieldsByModule = Record<string, RequiredField[]>;

export type MappingAction = 'insert' | 'update' | 'upsert';

export interface ModuleOverview {
  moduleApiName: string;
  action: MappingAction;
  mappedCount: number;
  requiredFields: RequiredField[];
  metRequired: RequiredField[];
  unmetRequired: RequiredField[];
}

/**
 * insert/update スコープの有無から動作ラベルを決める。
 * 両方にタブが含まれれば upsert（追加も更新も）、update のみなら update、それ以外は insert。
 */
export const resolveAction = (insert: boolean, update: boolean): MappingAction => {
  if (insert && update) return 'upsert';
  if (update) return 'update';
  return 'insert';
};

/**
 * 送信ルール（複数グループ）とフィールドマッピングを、送信先タブ単位に集計する。
 *
 * - action はタブが insert/update いずれのスコープに現れるかの和で決める（複数グループ横断で集約）。
 * - 必須充足は「新規作成を伴う動作(insert/upsert)」のときだけ判定する。更新のみのタブは既存値が
 *   あるため必須欠落を警告しない（unmetRequired は空）。
 */
export const buildMappingOverview = (
  groups: SendRuleGroup[],
  mappings: FieldMapping[],
  requiredByModule: RequiredFieldsByModule
): ModuleOverview[] => {
  const insertSet = new Set<string>();
  const updateSet = new Set<string>();
  for (const g of groups) {
    g.insertScopes.forEach(m => m && insertSet.add(m));
    g.updateScopes.forEach(m => m && updateSet.add(m));
  }

  const modules = [...new Set<string>([...insertSet, ...updateSet])];

  return modules.map(moduleApiName => {
    const action = resolveAction(insertSet.has(moduleApiName), updateSet.has(moduleApiName));

    const mappedFieldApiNames = new Set(
      mappings
        .filter(m => m.moduleApiNames.includes(moduleApiName))
        .map(m => m.fieldApiName)
        .filter(Boolean)
    );

    const requiredFields = requiredByModule[moduleApiName] || [];
    const requiresCheck = action === 'insert' || action === 'upsert';
    const metRequired = requiresCheck
      ? requiredFields.filter(f => mappedFieldApiNames.has(f.apiName))
      : requiredFields;
    const unmetRequired = requiresCheck
      ? requiredFields.filter(f => !mappedFieldApiNames.has(f.apiName))
      : [];

    return {
      moduleApiName,
      action,
      mappedCount: mappedFieldApiNames.size,
      requiredFields,
      metRequired,
      unmetRequired,
    };
  });
};

// ---- 項目名セレクトの選択整合（タブ変更で選択済み項目が無効になった場合の扱い） ----

export type FieldSelectionOutcome<T> =
  | { kind: 'keep' }
  | { kind: 'upgrade'; field: T }
  | { kind: 'clear' };

/**
 * 選択済みの項目を、現在のタブ全てに共通する項目一覧（availableFields）と突き合わせて
 * keep（そのまま） / upgrade（同じapiNameのフルデータに差し替え） / clear（無効なので消す）を判定する。
 *
 * 「複数タブを指定した項目マッピング行」でタブ構成を変えたとき、以前選択していた項目が
 * 新しいタブ集合に存在しなければ無効な組み合わせになる（例: 見込み客の「会社」は連絡先に無い）。
 * これを検出せずに古い値を保持すると、画面上は選択済みに見えるまま、実際には存在しないZoho項目名が
 * 保存され続け、送信時に不正な項目としてエラーになったり、意図しないデータになったりする。
 *
 * isLoading 中や availableFields が空（フェッチ中・タブ未選択）のときは判定を保留する（keep）。
 * 誤ってロード中の一時的な空配列を「無効」と誤判定して消してしまうのを防ぐため。
 *
 * 選んだ実体（オブジェクト参照）が候補内に存在するかを先に確認してから apiName で探す。
 * 本プラグインは Note_Title/Note_Content を仮想フィールドとして配列の末尾に追加するため、
 * Zoho側に偶然同じ apiName を持つ実フィールドが存在すると、apiName だけでの検索は
 * 配列前方の実フィールドを先に見つけてしまい、ユーザーが選んだ仮想フィールドを別物に上書きしてしまう。
 */
export const resolveFieldSelection = <T extends { apiName: string }>(
  selected: T | null,
  availableFields: T[],
  isLoading: boolean
): FieldSelectionOutcome<T> => {
  if (!selected || isLoading || availableFields.length === 0) {
    return { kind: 'keep' };
  }
  if (availableFields.includes(selected)) {
    return { kind: 'keep' };
  }
  const match = availableFields.find(f => f.apiName === selected.apiName);
  if (!match) {
    return { kind: 'clear' };
  }
  return { kind: 'upgrade', field: match };
};
