import * as R from 'remeda';

import { createPerfectionistConfig } from './configs/perfectionist.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { createStylisticConfig } from './configs/stylistic.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createIgnoreConfig } from './configs/gitignore.ts';
import type { FlatConfig, RuleLevel } from './utilities.ts';
import { createCommandConfig } from './configs/command.ts';
import {
  defineBoundedConfig,
  getAllRulesConfig,
  JAVASCRIPT_LIKE_FILES,
  normalizeRuleLevel,
} from './utilities.ts';

interface Options {
  prettierPrintWidth: number;
  rootDirname: string;
  ruleLevel: RuleLevel | undefined;
  shouldEnableAllRules: boolean;
}

const createConfig = function (options: Options): FlatConfig[] {
  const { prettierPrintWidth, rootDirname, ruleLevel, shouldEnableAllRules } =
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
    {
      name: 'perfectionist',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createPerfectionistConfig({
        sortImportsMaxLineLength: prettierPrintWidth,
      }),
    },
    {
      name: 'stylistic',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createStylisticConfig(),
    },
  ]);

  if (shouldEnableAllRules) {
    config = R.concat(getAllRulesConfig(config), config);
  }

  if (ruleLevel) {
    config = normalizeRuleLevel(config, ruleLevel);
  }

  return config;
};

export { createConfig };
