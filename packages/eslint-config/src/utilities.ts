import type { ConfigArray } from 'typescript-eslint';
import { config as defineConfig } from 'typescript-eslint';
import eslintJs from '@eslint/js';
import * as R from 'remeda';

type FlatConfig = ConfigArray[number];
type Plugins = NonNullable<FlatConfig['plugins']>;
type Rules = NonNullable<FlatConfig['rules']>;
type RuleEntry = NonNullable<Rules[string]>;
type RuleLevel = Extract<RuleEntry, string>;
type InfiniteDepthFlatConfig = FlatConfig | InfiniteDepthFlatConfig[];
interface BoundedConfigBase {
  name: string;
}
interface BoundedConfigIgnores extends BoundedConfigBase {
  ignores: string[];
}
interface BoundedConfigExtends extends BoundedConfigBase {
  files: string[];
  extends: FlatConfig[];
}
type BoundedConfig = BoundedConfigIgnores | BoundedConfigExtends;

const FILES = {
  js: '**/*.{js,cjs,mjs}',
  ts: '**/*.{ts,cts,mts}',
  jsx: '**/*.{jsx,cjsx,mjsx}',
  tsx: '**/*.{tsx,ctsx,mtsx}',
};
const JAVASCRIPT_LIKE_FILES = [FILES.js, FILES.ts, FILES.jsx, FILES.tsx];

function defineInfiniteDepthFlatConfig(
  infiniteDepthFlatConfigs: InfiniteDepthFlatConfig[],
): FlatConfig[] {
  return defineConfig(infiniteDepthFlatConfigs);
}

function defineBoundedConfig(boundedConfigs: BoundedConfig[]): FlatConfig[] {
  boundedConfigs.forEach((boundedConfig) => {
    const boundedConfigName = boundedConfig.name.trim();
    boundedConfig.name = `bounded/${boundedConfigName}`;

    if ('extends' in boundedConfig) {
      boundedConfig.extends.forEach((extendConfig, extendIndex) => {
        const extendConfigName = extendConfig.name?.trim();

        if (extendConfigName) {
          extendConfig.name = `[extends-${extendIndex}]__${extendConfigName}`;
        } else {
          extendConfig.name = `[extends-${extendIndex}]`;
        }
      });
    }
  });

  return defineConfig(boundedConfigs);
}

function getBuiltInAllRuleNames(): string[] {
  return R.keys(eslintJs.configs.all.rules);
}

function createErrorRuleConfigFromNames(ruleNames: string[]): Rules {
  return R.mapToObj(ruleNames, (ruleName) => [ruleName, 'error']);
}

function getPluginsAllRuleNames(plugins?: Plugins): string[] {
  if (!plugins) {
    return [];
  }

  return Object.entries(plugins).flatMap(([pluginName, plugin]) => {
    if (!plugin.rules) {
      return [];
    }

    return Object.entries(plugin.rules)
      .filter(([, rule]) => {
        const isDeprecated =
          'meta' in rule &&
          rule.meta &&
          'deprecated' in rule.meta &&
          rule.meta.deprecated === true;
        return !isDeprecated;
      })
      .map(([ruleName]) => `${pluginName}/${ruleName}`);
  });
}

function getAllRulesConfig(configs: FlatConfig[]): FlatConfig[] {
  const builtInAllConfig: FlatConfig = {
    name: 'all-rules/built-in',
    files: JAVASCRIPT_LIKE_FILES,
    rules: createErrorRuleConfigFromNames(getBuiltInAllRuleNames()),
  };
  const pluginsAllConfigs = R.pipe(
    configs,
    R.map((config, configIndex) => ({
      ...config,
      name: `all-rules/${config.name ?? configIndex}`,
      rules: createErrorRuleConfigFromNames(
        getPluginsAllRuleNames(config.plugins),
      ),
    })),
    R.filter((config) => !R.isEmpty(config.rules)),
    R.map(R.pick(['name', 'files', 'ignores', 'rules'])),
  );

  return [builtInAllConfig, ...pluginsAllConfigs];
}

function isRuleLevelOff(ruleEntry?: RuleEntry): boolean {
  if (R.isNullish(ruleEntry)) {
    return true;
  }

  const ruleLevel = R.isArray(ruleEntry) ? ruleEntry[0] : ruleEntry;

  return [0, 'off'].includes(ruleLevel);
}

function normalizeRuleLevel(
  configs: FlatConfig[],
  level: RuleLevel,
): FlatConfig[] {
  const clonedConfigs = R.clone(configs);

  for (const { rules } of clonedConfigs) {
    if (!rules) {
      continue;
    }

    for (const [ruleName, rule] of Object.entries(rules)) {
      if (isRuleLevelOff(rule)) {
        continue;
      }

      rules[ruleName] = R.isArray(rule) ? [level, ...rule.slice(1)] : level;
    }
  }

  return clonedConfigs;
}

export {
  defineBoundedConfig,
  defineInfiniteDepthFlatConfig,
  type FlatConfig,
  getAllRulesConfig,
  JAVASCRIPT_LIKE_FILES,
  normalizeRuleLevel,
  type RuleLevel,
};
