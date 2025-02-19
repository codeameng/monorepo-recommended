import { Config, ConfigOrArray } from '$types/index.ts';
import { GLOBS } from '$utils/globs.ts';
import { R } from '@packages/utils';
import { createBuiltInConfig } from './built-in.ts';
import { defineConfig } from '$utils/index.ts';
import { createTypescriptConfig } from './typescript.ts';
import { createGitignoreConfig } from './gitignore.ts';

interface PresetConfigWithIgnores {
  name: string;
  ignores: string[];
}
interface PresetConfigWithExtends {
  name: string;
  files: (string | string[])[];
  extends: ConfigOrArray[];
}
type PresetConfig = PresetConfigWithIgnores | PresetConfigWithExtends;
function definePresetConfig(configs: PresetConfig[]): Config[] {
  const presetConfigs: Config[] = [];

  R.forEach(configs, (config) => {
    if ('ignores' in config) {
      presetConfigs.push(config);
    }

    if ('extends' in config) {
      const extendsConfigs = defineConfig(config.extends);
      R.forEach(extendsConfigs, (extendsConfig) => {
        presetConfigs.push({
          ...extendsConfig,
          files: config.files,
        });
      });
    }
  });

  return presetConfigs;
}

export interface Options {
  rootDirectory: string;
}
export async function createPresetConfig(options: Options): Promise<Config[]> {
  const { rootDirectory } = options;

  return definePresetConfig([
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
