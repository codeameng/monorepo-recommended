import perfectionistPlugin from 'eslint-plugin-perfectionist';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

interface Options {
  aliasPathPatterns: string[];
  workspacePackagePathPatterns: string[];
}

interface CustomGroups {
  type: Record<string, string>;
  value: Record<string, string>;
}

interface CustomGroupEntry {
  pattern: string;
  typeKey: string;
  valueKey: string;
}

type Groups = [string[], string[]];

const createCustomGroupEntry = (
  baseKey: string,
  pattern: string,
  index: number,
): CustomGroupEntry => ({
  typeKey: `${baseKey}-type-${index}`,
  valueKey: `${baseKey}-${index}`,
  pattern,
});

const createPerfectionistConfig = function (options: Options): FlatConfig[] {
  const { aliasPathPatterns, workspacePackagePathPatterns } = options;

  const customGroups: CustomGroups = {
    type: {},
    value: {},
  };

  const workspacePackagePathGroups: Groups = [[], []];
  const aliasPathGroups: Groups = [[], []];

  const addToCustomGroups = (entry: CustomGroupEntry): void => {
    customGroups.type[entry.typeKey] = entry.pattern;
    customGroups.value[entry.valueKey] = entry.pattern;
  };

  const addToGroupArrays = (groups: Groups, entry: CustomGroupEntry): void => {
    groups[0].push(entry.typeKey);
    groups[1].push(entry.valueKey);
  };

  workspacePackagePathPatterns.forEach((pattern, index) => {
    const entry = createCustomGroupEntry('workspace-package', pattern, index);

    addToCustomGroups(entry);
    addToGroupArrays(workspacePackagePathGroups, entry);
  });

  aliasPathPatterns.forEach((pattern, index) => {
    const entry = createCustomGroupEntry('global-alias', pattern, index);

    addToCustomGroups(entry);
    addToGroupArrays(aliasPathGroups, entry);
  });

  return defineInfiniteDepthFlatConfig([
    {
      plugins: {
        perfectionist: perfectionistPlugin,
      },
      settings: {
        perfectionist: {
          type: 'natural',
          ignoreCase: false,
        },
      },
      // @keep-sorted
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups,
            groups: [
              'builtin-type',
              'builtin',
              'external-type',
              'external',
              'internal-type',
              'internal',
              ...workspacePackagePathGroups,
              ...aliasPathGroups,
              'parent-type',
              'parent',
              'sibling-type',
              'sibling',
              'index-type',
              'index',
              'object',
              'style',
              'side-effect',
              'side-effect-style',
              'unknown',
            ],
          },
        ],
        'perfectionist/sort-interfaces': 'error',
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            groupKind: 'values-first',
          },
        ],
        'perfectionist/sort-named-imports': 'error',
        'perfectionist/sort-objects': [
          'error',
          {
            destructureOnly: true,
          },
        ],
        'perfectionist/sort-union-types': 'error',
      },
    },
  ]);
};

export { createPerfectionistConfig };
