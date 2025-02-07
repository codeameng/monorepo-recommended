import { R } from '@packages/utilities';

import { files } from '$utilities/files.ts';

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
  getAllRulesConfig,
  normalizeRuleLevel,
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
      files: files['javascript-like'],
      extends: createCommandConfig(),
    },
    {
      name: 'built-in',
      files: files['javascript-like'],
      extends: createBuiltInConfig(),
    },
    {
      name: 'typescript',
      files: files['javascript-like'],
      extends: createTypescriptConfig({
        tsconfigRootDir,
      }),
    },
    {
      name: 'import-x',
      files: files['javascript-like'],
      extends: createImportXConfig({
        tsconfigProject,
      }),
    },
    {
      name: 'unused-imports',
      files: files['javascript-like'],
      extends: createUnusedImportsConfig(),
    },
    {
      name: 'perfectionist',
      files: files['javascript-like'],
      extends: createPerfectionistConfig({
        sortImportsMaxLineLength: prettierPrintWidth,
      }),
    },
    {
      name: 'stylistic',
      files: files['javascript-like'],
      extends: createStylisticConfig(),
    },
    {
      name: 'jsonc',
      files: [files.json],
      extends: createJsoncConfig(),
    },
    {
      name: 'depend',
      files: [files['package-json'], ...files['javascript-like']],
      extends: createDependConfig(),
    },
    {
      name: 'sort-json',
      files: [files.json],
      extends: createSortJsonConfig(),
    },
    {
      name: 'sort-json/package-json',
      files: [files['package-json']],
      extends: createSortPackageJsonConfig(),
    },
    {
      name: 'sort-json/tsconfig-json',
      files: files['tsconfig-json'],
      extends: createSortTsconfigJsonConfig(),
    },
    {
      name: 'sort-json/turbo-json',
      files: [files['turbo-json']],
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

export { createConfig, files };
