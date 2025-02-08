import { R } from '@packages/utilities';

import { FILES } from '$utilities/files.ts';

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
      files: FILES['js-like'],
      extends: createCommandConfig(),
    },
    {
      name: 'depend',
      files: [FILES['package.json'], ...FILES['js-like']],
      extends: createDependConfig(),
    },
    {
      name: 'built-in',
      files: FILES['js-like'],
      extends: createBuiltInConfig(),
    },
    {
      name: 'typescript',
      files: FILES['js-like'],
      extends: createTypescriptConfig({
        tsconfigRootDir: typescriptConfig.tsconfigRootDir,
      }),
    },
    {
      name: 'prefer-arrow',
      files: FILES['js-like'],
      extends: createPreferArrowConfig(),
    },
    {
      name: 'regexp',
      files: FILES['js-like'],
      extends: createRegexpConfig(),
    },
    {
      name: 'import-x',
      files: FILES['js-like'],
      extends: createImportXConfig({
        aliasPathPatterns: importConfig.aliasPathPatterns,
        tsconfigProject: typescriptConfig.tsconfigProject,
      }),
    },
    {
      name: 'unused-imports',
      files: FILES['js-like'],
      extends: createUnusedImportsConfig(),
    },
    {
      name: 'perfectionist',
      files: FILES['js-like'],
      extends: createPerfectionistConfig({
        aliasPathPatterns: importConfig.aliasPathPatterns,
        workspacePackagePathPatterns: importConfig.workspacePackagePathPatterns,
      }),
    },
    {
      name: 'stylistic',
      files: FILES['js-like'],
      extends: createStylisticConfig(),
    },
    {
      name: 'jsonc',
      files: [FILES['*.json']],
      extends: createJsoncConfig(),
    },
    {
      name: 'sort-json',
      files: [FILES['*.json']],
      extends: createSortJsonConfig(),
    },
    {
      name: 'sort-json/package-json',
      files: [FILES['package.json']],
      extends: createSortPackageJsonConfig(),
    },
    {
      name: 'sort-json/tsconfig-json',
      files: FILES['tsconfig.json'],
      extends: createSortTsconfigJsonConfig(),
    },
    {
      name: 'sort-json/turbo-json',
      files: [FILES['turbo.json']],
      extends: createSortTurboJsonConfig(),
    },
  ]);

  const specialConfig: FlatConfig[] = [
    {
      files: [FILES['js-like-config'], FILES['package.d.ts']],
      rules: {
        'import-x/no-default-export': 'off',
      },
    },
    {
      name: 'dts',
      files: [FILES['*.d.ts']],
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

export { createConfig, FILES };
