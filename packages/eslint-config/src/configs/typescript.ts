import { ESLintConfig } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import typescriptEslint from 'typescript-eslint';

interface TypescriptOptions {
  tsconfigRootDir: string;
}
export function createTypescriptConfig(
  options: TypescriptOptions,
): ESLintConfig[] {
  const { tsconfigRootDir } = options;

  return defineConfig([
    typescriptEslint.configs.strictTypeChecked,
    typescriptEslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
  ]);
}
