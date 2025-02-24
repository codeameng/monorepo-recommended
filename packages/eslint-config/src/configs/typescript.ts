import { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import typescriptEslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import { R } from '@packages/utils';

function disableOverriddenRules(): Config {
  return {
    name: 'typescript-disable-overridden-rules',
    rules: R.pipe(
      eslintJs.configs.all.rules,
      R.keys(),
      R.intersection(R.keys(typescriptEslint.plugin.rules ?? {})),
      R.mapToObj((ruleName) => [ruleName, 'off']),
    ),
  };
}

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
    disableOverriddenRules(),
  ]);
}
