import { ESLintConfig } from '$types/index.ts';
import { GLOBS } from '$utils/globs.ts';
import { createBuiltInConfig } from './built-in.ts';
import { createTypescriptConfig } from './typescript.ts';
import { createGitignoreConfig } from './gitignore.ts';
import { defineConfig } from '$utils/index.ts';

export interface PresetOptions {
  rootDirectory: string;
}
export async function createPresetConfig(
  options: PresetOptions,
): Promise<ESLintConfig[]> {
  const { rootDirectory } = options;

  return defineConfig([
    {
      ...(await createGitignoreConfig({ rootDirectory })),
      name: 'gitignore',
    },
    {
      name: 'built-in',
      files: GLOBS.ALL_JS_LIKE,
      extends: createBuiltInConfig(),
    },
    {
      name: 'typescript',
      files: GLOBS.ALL_JS_LIKE,
      extends: createTypescriptConfig({ tsconfigRootDir: rootDirectory }),
    },
  ]);
}
