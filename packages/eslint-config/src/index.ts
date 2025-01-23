import * as R from 'remeda';

import { createPerfectionistConfig } from './configs/perfectionist.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { createStylisticConfig } from './configs/stylistic.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createIgnoreConfig } from './configs/gitignore.ts';
import { createCommandConfig } from './configs/command.ts';
import type { FlatConfig, RuleLevel } from './utilities.ts';
import {
  defineBoundedConfig,
  JAVASCRIPT_LIKE_FILES,
  getAllRulesConfig,
  normalizeRuleLevel,
} from './utilities.ts';

interface Options {
  shouldEnableAllRules: boolean;
  rootDirname: string;
  ruleLevel: RuleLevel | undefined;
  prettierPrintWidth: number;
}
function createConfig(options: Options): FlatConfig[] {
  const { shouldEnableAllRules, rootDirname, ruleLevel, prettierPrintWidth } =
    options;

  let config = defineBoundedConfig([
    {
      ...createIgnoreConfig(),
      name: 'gitignore',
    },
    {
      name: 'command',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createCommandConfig(),
    },
    {
      name: 'built-in',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createBuiltInConfig(),
    },
    {
      name: 'typescript',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createTypescriptConfig({
        tsconfigRootDir: rootDirname,
      }),
    },
    // {
    //   name: 'perfectionist',
    //   files: JAVASCRIPT_LIKE_FILES,
    //   extends: createPerfectionistConfig({
    //     sortImportsMaxLineLength: prettierPrintWidth,
    //   }),
    // },
    // {
    //   name: 'stylistic',
    //   files: JAVASCRIPT_LIKE_FILES,
    //   extends: createStylisticConfig(),
    // },
  ]);

  if (shouldEnableAllRules) {
    config = R.concat(getAllRulesConfig(config), config);
  }

  if (ruleLevel) {
    config = normalizeRuleLevel(config, ruleLevel);
  }

  return config;
}

export { createConfig };
