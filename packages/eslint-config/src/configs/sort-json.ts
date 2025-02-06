import { defineInfiniteDepthFlatConfig } from '../utilities.ts';
import type { FlatConfig } from '../utilities.ts';

const createSortJsonConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    {
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: {
              type: 'asc',
            },
            pathPattern: '^$',
          },
        ],
      },
    },
  ]);
};

const createSortPackageJsonConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    {
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: {
              type: 'asc',
            },
            pathPattern:
              '^(files|keywords|categories|activationEvents|extensionPack|extensionDependencies)$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              '$schema',
              'name',
              'displayName',
              'version',
              'private',
              'description',
              'type',
              'packageManager',
              'publishConfig',
              'volta',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'license',
              'main',
              'module',
              'exports',
              'types',
              'typings',
              'typesVersions',
              'browser',
              'umd:main',
              'jsdelivr',
              'unpkg',
              'svelte',
              'react-native',
              'scripts',
              'dependencies',
              'devDependencies',
              'peerDependencies',
              'optionalDependencies',
              'bundledDependencies',
              'resolutions',
              'engines',
              'os',
              'cpu',
              'browserslist',
              'config',
              'nodemonConfig',
              'eslintConfig',
              'prettier',
              'lint-staged',
              'husky',
              'simple-git-hooks',
              'jest',
              'mocha',
              'ava',
              'nyc',
              'c8',
              'files',
              'sideEffects',
              'workspaces',
              'bin',
              'man',
              'directories',
              'publisher',
              'categories',
              'contributes',
              'activationEvents',
              'icon',
              'badges',
              'galleryBanner',
              'markdown',
              'qna',
            ],
            pathPattern: '^$',
          },
          {
            order: {
              type: 'asc',
            },
            pathPattern:
              '^(dependencies|devDependencies|peerDependencies|optionalDependencies|resolutions)$',
          },
          {
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports\\..*$',
          },
          {
            order: [
              'applypatch-msg',
              'pre-applypatch',
              'post-applypatch',
              'pre-commit',
              'pre-merge-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-receive',
              'update',
              'proc-receive',
              'post-receive',
              'post-update',
              'reference-transaction',
              'push-to-checkout',
              'pre-auto-gc',
              'post-rewrite',
              'sendemail-validate',
              'fsmonitor-watchman',
              'p4-changelist',
              'p4-prepare-changelist',
              'p4-post-changelist',
              'p4-pre-submit',
              'post-index-change',
            ],
            pathPattern: '^(gitHooks|husky|simple-git-hooks)$',
          },
          {
            order: ['pre-commit', 'commit-msg', 'post-commit', 'pre-push'],
            pathPattern: '^lint-staged$',
          },
        ],
      },
    },
  ]);
};

const createSortTsconfigJsonConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    {
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude',
            ],
            pathPattern: '^$',
          },
          {
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',

              /* Language and Environment */
              'target',
              'jsx',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'lib',
              'moduleDetection',
              'noLib',
              'reactNamespace',
              'useDefineForClassFields',
              'emitDecoratorMetadata',
              'experimentalDecorators',

              /* Modules */
              'baseUrl',
              'rootDir',
              'rootDirs',
              'customConditions',
              'module',
              'moduleResolution',
              'moduleSuffixes',
              'noResolve',
              'paths',
              'resolveJsonModule',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'typeRoots',
              'types',
              'allowArbitraryExtensions',
              'allowImportingTsExtensions',
              'allowUmdGlobalAccess',

              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',

              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',

              /* Emit */
              'declaration',
              'declarationDir',
              'declarationMap',
              'downlevelIteration',
              'emitBOM',
              'emitDeclarationOnly',
              'importHelpers',
              'importsNotUsedAsValues',
              'inlineSourceMap',
              'inlineSources',
              'mapRoot',
              'newLine',
              'noEmit',
              'noEmitHelpers',
              'noEmitOnError',
              'outDir',
              'outFile',
              'preserveConstEnums',
              'preserveValueImports',
              'removeComments',
              'sourceMap',
              'sourceRoot',
              'stripInternal',

              /* Interop Constraints */
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'forceConsistentCasingInFileNames',
              'isolatedDeclarations',
              'isolatedModules',
              'preserveSymlinks',
              'verbatimModuleSyntax',

              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
            pathPattern: '^compilerOptions$',
          },
        ],
      },
    },
  ]);
};

const createSortTurboJsonConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    {
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              '$schema',
              'tasks',
              'globalDependencies',
              'globalEnv',
              'globalPassThroughEnv',
              'remoteCache',
              'ui',
              'dangerouslyDisablePackageManagerCheck',
              'cacheDir',
              'daemon',
              'envMode',
            ],
            pathPattern: '^$',
          },
          {
            order: [
              'dependsOn',
              'env',
              'passThroughEnv',
              'outputs',
              'cache',
              'inputs',
              'outputLogs',
              'persistent',
              'interactive',
            ],
            pathPattern: '^tasks\\..+$',
          },
          {
            order: [
              'signature',
              'enabled',
              'preflight',
              'apiUrl',
              'loginUrl',
              'timeout',
            ],
            pathPattern: '^remoteCache$',
          },
          {
            order: ['$schema', 'extends', 'tasks'],
            pathPattern: '^$',
          },
        ],
      },
    },
  ]);
};

export {
  createSortJsonConfig,
  createSortPackageJsonConfig,
  createSortTsconfigJsonConfig,
  createSortTurboJsonConfig,
};
