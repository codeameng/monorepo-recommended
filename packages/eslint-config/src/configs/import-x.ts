import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
import eslintPluginImportX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export const createImportXConfig = (typescriptProject: string[]): Config[] => {
  return defineConfig([
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            project: typescriptProject,
          }),
        ],
      },
      rules: {}
    },
  ]);
};
