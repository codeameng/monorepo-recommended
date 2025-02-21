import { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import typescriptEslint from 'typescript-eslint';

interface Options {
  tsconfigRootDir: string;
}
export function createTypescriptConfig(options: Options): Config[] {
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
