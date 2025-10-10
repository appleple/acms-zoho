<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Models;

/**
 * Zoho CRM モジュールのスコープを表すモデルクラス
 */
class ModuleScope
{
    /**
     * @var string モジュールのAPI名
     */
    public string $apiName;

    /**
     * @var string モジュール名
     */
    public string $moduleName;

    /**
     * @var string モジュールの単数形ラベル
     */
    public string $singularLabel;

    /**
     * コンストラクタ
     *
     * @param string $apiName
     * @param string $moduleName
     * @param string $singularLabel
     */
    public function __construct(string $apiName, string $moduleName = '', string $singularLabel = '')
    {
        $this->apiName = $apiName;
        $this->moduleName = $moduleName;
        $this->singularLabel = $singularLabel;
    }

    /**
     * 配列からインスタンスを作成
     *
     * @param array|string $data 配列データまたはapiName文字列
     * @return self
     */
    public static function fromArray($data): self
    {
        // 文字列の場合はapiNameとして扱う（後方互換性）
        if (is_string($data)) {
            return new self($data);
        }

        // 配列の場合
        if (is_array($data)) {
            return new self(
                $data['apiName'] ?? '',
                $data['moduleName'] ?? '',
                $data['singularLabel'] ?? ''
            );
        }

        // それ以外は空のインスタンス
        return new self('');
    }

    /**
     * JSON文字列から配列のインスタンスを作成
     *
     * @param string $json JSON文字列
     * @return array<ModuleScope>
     */
    public static function parseJsonArray(string $json): array
    {
        if (empty($json)) {
            return [];
        }

        $data = json_decode($json, true);
        if (!is_array($data)) {
            return [];
        }

        return array_map([self::class, 'fromArray'], $data);
    }

    /**
     * apiName配列を取得
     *
     * @param array<ModuleScope> $scopes
     * @return array<string>
     */
    public static function toApiNames(array $scopes): array
    {
        return array_map(function(ModuleScope $scope) {
            return $scope->apiName;
        }, $scopes);
    }
}
