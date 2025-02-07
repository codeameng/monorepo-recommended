import { R } from '@packages/utilities';

import { createUnusedImportsConfig } from './configs/unused-imports.ts';
import { createPerfectionistConfig } from './configs/perfectionist.ts';
import type { FlatConfig, RuleLevel } from './utilities/index.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { createStylisticConfig } from './configs/stylistic.ts';
import { createBuiltInConfig } from './configs/built-in.ts';
import { createIgnoreConfig } from './configs/gitignore.ts';
import { createImportXConfig } from './configs/import-x.ts';
import { createCommandConfig } from './configs/command.ts';
import { createDependConfig } from './configs/depend.ts';
import { createJsoncConfig } from './configs/jsonc.ts';
import {
  createSortJsonConfig,
  createSortPackageJsonConfig,
  createSortTsconfigJsonConfig,
  createSortTurboJsonConfig,
} from './configs/sort-json.ts';
import {
  defineBoundedConfig,
  FILES,
  getAllRulesConfig,
  JAVASCRIPT_LIKE_FILES,
  normalizeRuleLevel,
  PACKAGE_JSON_FILES,
  TS_CONFIG_JSON_FILES,
  TURBO_JSON_FILES,
} from './utilities/index.ts';

interface Options {
  overrides: FlatConfig[];
  prettierPrintWidth: number;
  ruleLevel: null | RuleLevel;
  shouldEnableAllRules: boolean;
  tsconfigProject: string[];
  tsconfigRootDir: string;
}

const createConfig = function (options: Options): FlatConfig[] {
  const {
    overrides,
    prettierPrintWidth,
    ruleLevel,
    shouldEnableAllRules,
    tsconfigProject,
    tsconfigRootDir,
  } = options;

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
        tsconfigRootDir,
      }),
    },
    {
      name: 'import-x',
      files: JAVASCRIPT_LIKE_FILES,
      extends: createImportXConfig({
        tsconfigProject,
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
    {
      name: 'sort-json',
      files: [FILES.json],
      extends: createSortJsonConfig(),
    },
    {
      name: 'sort-json/package-json',
      files: [PACKAGE_JSON_FILES],
      extends: createSortPackageJsonConfig(),
    },
    {
      name: 'sort-json/tsconfig-json',
      files: TS_CONFIG_JSON_FILES,
      extends: createSortTsconfigJsonConfig(),
    },
    {
      name: 'sort-json/turbo-json',
      files: [TURBO_JSON_FILES],
      extends: createSortTurboJsonConfig(),
    },
  ]);

  if (shouldEnableAllRules) {
    config = R.concat(getAllRulesConfig(config), config);
  }

  if (ruleLevel) {
    config = normalizeRuleLevel(config, ruleLevel);
  }

  return [...config, ...overrides];
};

export { createConfig };
