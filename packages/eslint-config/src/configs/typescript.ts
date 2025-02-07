import eslintJs from '@eslint/js';
import { configs, plugin } from 'typescript-eslint';

import { R } from '@packages/utilities';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const disableRedundantRules = function (): FlatConfig {
  return {
    rules: R.pipe(
      eslintJs.configs.all.rules,
      R.keys(),
      R.intersection(R.keys(plugin.rules ?? {})),
      R.mapToObj((ruleName) => [ruleName, 'off']),
    ),
  };
};

interface Options {
  tsconfigRootDir: string;
}

const createTypescriptConfig = function (options: Options): FlatConfig[] {
  const { tsconfigRootDir } = options;

  return defineInfiniteDepthFlatConfig([
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    configs.strictTypeChecked,
    configs.stylisticTypeChecked,
    disableRedundantRules(),
    {
      // @keep-sorted
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'enum',
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'objectLiteralProperty',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase', 'UPPER_CASE'],
            prefix: R.flatMap(
              ['is', 'should', 'has', 'can', 'did', 'will'],
              (prefix) => [prefix, `${prefix.toUpperCase()}_`],
            ),
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: ['objectLiteralProperty', 'typeProperty'],
            format: [],
            modifiers: ['requiresQuotes'],
          },
        ],
        '@typescript-eslint/no-magic-numbers': [
          'error',
          {
            ignore: [0, 1],
          },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allow: [
              {
                name: ['URL', 'URLSearchParams'],
                from: 'lib',
              },
            ],
            allowAny: false,
            allowBoolean: false,
            allowNever: false,
            allowNullish: false,
            allowNumber: true,
            allowRegExp: false,
          },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowAny: false,
            allowNullableBoolean: true,
            allowNullableEnum: false,
            allowNullableNumber: false,
            allowNullableObject: true,
            allowNullableString: true,
            allowNumber: true,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
            allowString: true,
          },
        ],
      },
    },
  ]);
};

export { createTypescriptConfig };
