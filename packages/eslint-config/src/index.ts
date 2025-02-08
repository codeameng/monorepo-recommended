import { R } from '@packages/utilities';

import { files } from '$utilities/files.ts';

import type { FlatConfig, RuleLevel } from './utilities/index.ts';

import { createBuiltInConfig } from './configs/built-in.ts';
import { createCommandConfig } from './configs/command.ts';
import { createDependConfig } from './configs/depend.ts';
import { createIgnoreConfig } from './configs/gitignore.ts';
import { createImportXConfig } from './configs/import-x.ts';
import { createJsoncConfig } from './configs/jsonc.ts';
import { createPerfectionistConfig } from './configs/perfectionist.ts';
import { createPreferArrowConfig } from './configs/prefer-arrow.ts';
import { createRegexpConfig } from './configs/regexp.ts';
import {
  createSortJsonConfig,
  createSortPackageJsonConfig,
  createSortTsconfigJsonConfig,
  createSortTurboJsonConfig,
} from './configs/sort-json.ts';
import { createStylisticConfig } from './configs/stylistic.ts';
import { createTypescriptConfig } from './configs/typescript.ts';
import { createUnusedImportsConfig } from './configs/unused-imports.ts';
import {
  defineBoundedConfig,
  getAllRulesConfig,
  normalizeRuleLevel,
} from './utilities/index.ts';

interface Options {
  importConfig: {
    aliasPathPatterns: string[];
    workspacePackagePathPatterns: string[];
  };
  overrides: FlatConfig[];
  ruleLevel: null | RuleLevel;
  shouldEnableAllRules: boolean;
  typescriptConfig: {
    tsconfigProject: string[];
    tsconfigRootDir: string;
  };
}

const createConfig = (options: Options): FlatConfig[] => {
  const {
    importConfig,
    overrides,
    ruleLevel,
    shouldEnableAllRules,
    typescriptConfig,
  } = options;

  const generalConfig = defineBoundedConfig([
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
      name: 'depend',
      files: [files['package-json'], ...files['javascript-like']],
      extends: createDependConfig(),
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
        tsconfigRootDir: typescriptConfig.tsconfigRootDir,
      }),
    },
    {
      name: 'prefer-arrow',
      files: files['javascript-like'],
      extends: createPreferArrowConfig(),
    },
    {
      name: 'regexp',
      files: files['javascript-like'],
      extends: createRegexpConfig(),
    },
    {
      name: 'import-x',
      files: files['javascript-like'],
      extends: createImportXConfig({
        aliasPathPatterns: importConfig.aliasPathPatterns,
        tsconfigProject: typescriptConfig.tsconfigProject,
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
        aliasPathPatterns: importConfig.aliasPathPatterns,
        workspacePackagePathPatterns: importConfig.workspacePackagePathPatterns,
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

  const specialConfig: FlatConfig[] = [
    {
      files: [files['javascript-like-config'], files['package-d-ts']],
      rules: {
        'import-x/no-default-export': 'off',
      },
    },
    {
      name: 'dts',
      files: [files.dts],
      rules: {
        'import-x/unambiguous': 'off',
      },
    },
  ];

  let config = [...generalConfig, ...specialConfig, ...overrides];

  if (shouldEnableAllRules) {
    config = R.concat(getAllRulesConfig(config), config);
  }

  if (ruleLevel) {
    config = normalizeRuleLevel(config, ruleLevel);
  }

  return config;
};

export { createConfig, files };
