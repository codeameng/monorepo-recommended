import * as R from 'remeda';

import { createUnusedImportsConfig } from './configs/unused-imports.ts';
import { createPerfectionistConfig } from './configs/perfectionist.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { createStylisticConfig } from './configs/stylistic.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createIgnoreConfig } from './configs/gitignore.ts';
import type { FlatConfig, RuleLevel } from './utilities.ts';
import { createCommandConfig } from './configs/command.ts';
import { createDependConfig } from './configs/depend.ts';
import { createJsoncConfig } from './configs/jsonc.ts';
import {
  defineBoundedConfig,
  FILES,
  getAllRulesConfig,
  JAVASCRIPT_LIKE_FILES,
  normalizeRuleLevel,
  PACKAGE_JSON_FILES,
} from './utilities.ts';

interface Options {
  prettierPrintWidth: number;
  rootDirname: string;
  ruleLevel: null | RuleLevel;
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
      name: 'unused-imports',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createUnusedImportsConfig(),
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
    {
      name: 'jsonc',
      files: [FILES.json],
      extends: createJsoncConfig(),
    },
    {
      name: 'depend',
      files: [PACKAGE_JSON_FILES, ...JAVASCRIPT_LIKE_FILES],
      extends: createDependConfig(),
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
