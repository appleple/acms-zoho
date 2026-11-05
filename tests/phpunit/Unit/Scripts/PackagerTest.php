<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Scripts;

use Acms\PluginTools\Packager;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * リリース補助（scripts/release.php・scripts/version.php）が使う Packager::setVersion() を固定する。
 *
 * 一時ディレクトリにプロジェクトの最小構成（composer.json / src/ServiceProvider.php / package.json）を作り、
 * ServiceProvider.php の $version に合わせて package.json の "version" も書き換わることを検証する。
 */
final class PackagerTest extends TestCase
{
    private string $root;

    protected function setUp(): void
    {
        parent::setUp();
        $this->root = sys_get_temp_dir() . '/packager-test-' . bin2hex(random_bytes(6));
        mkdir($this->root . '/src', 0777, true);
        file_put_contents($this->root . '/composer.json', '{}');
        file_put_contents(
            $this->root . '/src/ServiceProvider.php',
            "<?php\nclass ServiceProvider\n{\n    public \$version = '3.1.0';\n}\n"
        );
    }

    protected function tearDown(): void
    {
        foreach (['src/ServiceProvider.php', 'composer.json', 'package.json'] as $file) {
            if (is_file($this->root . '/' . $file)) {
                unlink($this->root . '/' . $file);
            }
        }
        rmdir($this->root . '/src');
        rmdir($this->root);
        parent::tearDown();
    }

    #[Test]
    #[TestDox('setVersion は package.json の version も同じ値に更新し、ほかの内容と書式はそのまま残す')]
    public function setVersionUpdatesPackageJsonVersion(): void
    {
        $packageJson = "{\n  \"name\": \"acms-zoho\",\n  \"version\": \"3.1.0\",\n"
            . "  \"devDependencies\": {\n    \"vite\": \"^8.3.5\"\n  }\n}\n";
        file_put_contents($this->root . '/package.json', $packageJson);

        (new Packager($this->root))->setVersion('3.1.1');

        $this->assertSame(
            str_replace('"version": "3.1.0"', '"version": "3.1.1"', $packageJson),
            file_get_contents($this->root . '/package.json')
        );
        $this->assertSame('3.1.1', (new Packager($this->root))->currentVersion());
    }

    #[Test]
    #[TestDox('package.json が無いプロジェクトでは ServiceProvider.php だけを更新し、package.json は作らない')]
    public function setVersionWithoutPackageJson(): void
    {
        (new Packager($this->root))->setVersion('3.1.1');

        $this->assertSame('3.1.1', (new Packager($this->root))->currentVersion());
        $this->assertFileDoesNotExist($this->root . '/package.json');
    }

    #[Test]
    #[TestDox('package.json に version が無ければ package.json は変更しない')]
    public function setVersionLeavesPackageJsonWithoutVersionField(): void
    {
        $packageJson = "{\n  \"name\": \"acms-zoho\"\n}\n";
        file_put_contents($this->root . '/package.json', $packageJson);

        (new Packager($this->root))->setVersion('3.1.1');

        $this->assertSame($packageJson, file_get_contents($this->root . '/package.json'));
        $this->assertSame('3.1.1', (new Packager($this->root))->currentVersion());
    }
}
