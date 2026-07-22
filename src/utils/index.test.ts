import { describe, it, expect } from 'vitest';
import { resolveAction, buildMappingOverview, resolveFieldSelection } from './index';

describe('resolveAction', () => {
  it('両スコープに含まれれば upsert', () => {
    expect(resolveAction(true, true)).toBe('upsert');
  });
  it('update のみなら update', () => {
    expect(resolveAction(false, true)).toBe('update');
  });
  it('insert のみ／未設定は insert', () => {
    expect(resolveAction(true, false)).toBe('insert');
    expect(resolveAction(false, false)).toBe('insert');
  });
});

describe('buildMappingOverview', () => {
  it('送信先タブ単位に動作・マップ数・必須充足を集計する', () => {
    const overview = buildMappingOverview(
      [{ insertScopes: ['Leads'], updateScopes: ['Leads', 'Contacts'], uniqueKey: 'Email' }],
      [
        { moduleApiNames: ['Leads'], fieldApiName: 'Last_Name', insert: true, update: false },
        { moduleApiNames: ['Leads', 'Contacts'], fieldApiName: 'Email', insert: true, update: false },
      ],
      {
        Leads: [
          { apiName: 'Last_Name', fieldName: '姓' },
          { apiName: 'Company', fieldName: '会社' },
        ],
        Contacts: [{ apiName: 'Last_Name', fieldName: '姓' }],
      }
    );

    expect(overview).toEqual([
      {
        moduleApiName: 'Leads',
        action: 'upsert',
        mappedCount: 2,
        requiredFields: [
          { apiName: 'Last_Name', fieldName: '姓' },
          { apiName: 'Company', fieldName: '会社' },
        ],
        metRequired: [{ apiName: 'Last_Name', fieldName: '姓' }],
        unmetRequired: [{ apiName: 'Company', fieldName: '会社' }],
      },
      {
        moduleApiName: 'Contacts',
        action: 'update',
        mappedCount: 1,
        requiredFields: [{ apiName: 'Last_Name', fieldName: '姓' }],
        metRequired: [{ apiName: 'Last_Name', fieldName: '姓' }],
        unmetRequired: [],
      },
    ]);
  });

  it('更新のみのタブは必須欠落を警告しない（既存値で足りるため）', () => {
    const overview = buildMappingOverview(
      [{ insertScopes: [], updateScopes: ['Contacts'], uniqueKey: 'Email' }],
      [],
      { Contacts: [{ apiName: 'Last_Name', fieldName: '姓' }] }
    );
    expect(overview[0].action).toBe('update');
    expect(overview[0].unmetRequired).toEqual([]);
  });

  it('送信ルールが空なら空配列を返す', () => {
    expect(buildMappingOverview([], [], {})).toEqual([]);
  });

  it('追加のみで必須が未マップなら unmetRequired に出る', () => {
    const overview = buildMappingOverview(
      [{ insertScopes: ['Leads'], updateScopes: [], uniqueKey: '' }],
      [{ moduleApiNames: ['Leads'], fieldApiName: 'Email', insert: true, update: false }],
      { Leads: [{ apiName: 'Last_Name', fieldName: '姓' }] }
    );
    expect(overview[0].action).toBe('insert');
    expect(overview[0].mappedCount).toBe(1);
    expect(overview[0].metRequired).toEqual([]);
    expect(overview[0].unmetRequired).toEqual([{ apiName: 'Last_Name', fieldName: '姓' }]);
  });

  it('必須がすべてマップ済みなら unmetRequired は空', () => {
    const overview = buildMappingOverview(
      [{ insertScopes: ['Leads'], updateScopes: [], uniqueKey: '' }],
      [{ moduleApiNames: ['Leads'], fieldApiName: 'Last_Name', insert: true, update: false }],
      { Leads: [{ apiName: 'Last_Name', fieldName: '姓' }] }
    );
    expect(overview[0].unmetRequired).toEqual([]);
    expect(overview[0].metRequired).toEqual([{ apiName: 'Last_Name', fieldName: '姓' }]);
  });

  it('複数グループにまたがる同一タブの動作を集約する（追加行＋更新行→upsert）', () => {
    const overview = buildMappingOverview(
      [
        { insertScopes: ['Leads'], updateScopes: [], uniqueKey: '' },
        { insertScopes: [], updateScopes: ['Leads'], uniqueKey: 'Email' },
      ],
      [],
      {}
    );
    expect(overview).toHaveLength(1);
    expect(overview[0].moduleApiName).toBe('Leads');
    expect(overview[0].action).toBe('upsert');
  });

  it('1フィールドを複数タブにマップすると各タブでカウントされる', () => {
    const overview = buildMappingOverview(
      [{ insertScopes: ['Leads', 'Contacts'], updateScopes: [], uniqueKey: '' }],
      [{ moduleApiNames: ['Leads', 'Contacts'], fieldApiName: 'Email', insert: true, update: false }],
      {}
    );
    const leads = overview.find(o => o.moduleApiName === 'Leads');
    const contacts = overview.find(o => o.moduleApiName === 'Contacts');
    expect(leads?.mappedCount).toBe(1);
    expect(contacts?.mappedCount).toBe(1);
  });

  it('必須情報が無いタブは requiredFields も unmetRequired も空', () => {
    const overview = buildMappingOverview(
      [{ insertScopes: ['Deals'], updateScopes: [], uniqueKey: '' }],
      [{ moduleApiNames: ['Deals'], fieldApiName: 'Deal_Name', insert: true, update: false }],
      {}
    );
    expect(overview[0].requiredFields).toEqual([]);
    expect(overview[0].unmetRequired).toEqual([]);
  });
});

describe('resolveFieldSelection', () => {
  const company = { apiName: 'Company', fieldName: '会社' };
  const lastName = { apiName: 'Last_Name', fieldName: '姓' };

  it('未選択なら keep', () => {
    expect(resolveFieldSelection(null, [company, lastName], false)).toEqual({ kind: 'keep' });
  });

  it('ロード中は候補が揃っていなくても keep（誤クリア防止）', () => {
    expect(resolveFieldSelection(company, [], true)).toEqual({ kind: 'keep' });
  });

  it('候補が空（タブ未選択・フェッチ未着手）なら keep', () => {
    expect(resolveFieldSelection(company, [], false)).toEqual({ kind: 'keep' });
  });

  it('選択中のapiNameと完全一致する同一オブジェクトが候補にあれば keep', () => {
    expect(resolveFieldSelection(company, [company, lastName], false)).toEqual({ kind: 'keep' });
  });

  it('選択中のapiNameが候補にあるが別オブジェクト（フルデータ取得後）なら upgrade', () => {
    const partial = { apiName: 'Company', fieldName: 'Company' };
    const full = { apiName: 'Company', fieldName: '会社' };
    expect(resolveFieldSelection(partial, [full, lastName], false)).toEqual({ kind: 'upgrade', field: full });
  });

  it('タブ変更で選択中のapiNameが候補から消えたら clear（例: 見込み客の「会社」が連絡先には無い）', () => {
    // 連絡先には Company フィールドが無いケースを想定し、候補一覧には含めない。
    expect(resolveFieldSelection(company, [lastName], false)).toEqual({ kind: 'clear' });
  });

  it('同じapiNameの別オブジェクトが先に存在しても、選択中の実体が候補にあれば keep する（重複apiName対策）', () => {
    // 本プラグインが仮想的に追加する Note_Title(dataType='note') と、たまたま同じ apiName を
    // 持つ実フィールド(dataType='text')が同時に存在するケース。実フィールドは仮想フィールドより
    // 配列の前方にある（POST/Zoho/ModuleField.php が仮想フィールドを末尾に追加するため）。
    // apiName だけで最初の一致を採用すると、選んだはずの項目と別の項目に化けてしまう。
    const realTextField = { apiName: 'Note_Title', fieldName: 'Note_Title', dataType: 'text' };
    const virtualNoteField = { apiName: 'Note_Title', fieldName: 'メモタイトル', dataType: 'note' };
    expect(
      resolveFieldSelection(virtualNoteField, [realTextField, virtualNoteField], false)
    ).toEqual({ kind: 'keep' });
  });
});
