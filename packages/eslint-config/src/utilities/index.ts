import type { ConfigArray } from 'typescript-eslint';

import eslintJs from '@eslint/js';
import { isInEditor } from 'is-in-editor';
import { config as defineConfig } from 'typescript-eslint';

import { R } from '@packages/utilities';

import { files } from './files.ts';

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
  extends: FlatConfig[];
  files: string[];
}
type BoundedConfig = BoundedConfigExtends | BoundedConfigIgnores;

const OFF_LEVEL_IN_EDITOR = isInEditor() ? 'off' : 'error';

const defineInfiniteDepthFlatConfig = (
  infiniteDepthFlatConfigs: InfiniteDepthFlatConfig[],
): FlatConfig[] => {
  return defineConfig(infiniteDepthFlatConfigs);
};

const defineBoundedConfig = (boundedConfigs: BoundedConfig[]): FlatConfig[] => {
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
};

const getBuiltInAllRuleNames = (): string[] => {
  return R.keys(eslintJs.configs.all.rules);
};

const createErrorRuleConfigFromNames = (ruleNames: string[]): Rules => {
  return R.mapToObj(ruleNames, (ruleName) => {
    return [ruleName, 'error'];
  });
};

const getPluginsAllRuleNames = (plugins?: Plugins): string[] => {
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
      .map(([ruleName]) => {
        return `${pluginName}/${ruleName}`;
      });
  });
};

const getAllRulesConfig = (configs: FlatConfig[]): FlatConfig[] => {
  const builtInAllConfig: FlatConfig = {
    name: 'all-rules/built-in',
    files: files['javascript-like'],
    rules: createErrorRuleConfigFromNames(getBuiltInAllRuleNames()),
  };
  const pluginsAllConfigs = R.pipe(
    configs,
    R.map((config, configIndex) => {
      return {
        ...config,
        name: `all-rules/${config.name ?? configIndex}`,
        rules: createErrorRuleConfigFromNames(
          getPluginsAllRuleNames(config.plugins),
        ),
      };
    }),
    R.filter((config) => {
      return !R.isEmpty(config.rules);
    }),
    R.map(R.pick(['name', 'files', 'ignores', 'rules'])),
  );

  return [builtInAllConfig, ...pluginsAllConfigs];
};

const isRuleLevelOff = (ruleEntry?: RuleEntry): boolean => {
  if (R.isNullish(ruleEntry)) {
    return true;
  }

  const ruleLevel = R.isArray(ruleEntry) ? ruleEntry[0] : ruleEntry;

  return [0, 'off'].includes(ruleLevel);
};

const normalizeRuleLevel = (
  configs: FlatConfig[],
  level: RuleLevel,
): FlatConfig[] => {
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
};

export {
  defineBoundedConfig,
  defineInfiniteDepthFlatConfig,
  getAllRulesConfig,
  normalizeRuleLevel,
  OFF_LEVEL_IN_EDITOR,
  type FlatConfig,
  type RuleLevel,
};
