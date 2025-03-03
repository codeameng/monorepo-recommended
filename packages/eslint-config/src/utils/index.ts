import { R } from '@packages/utils';
import type {
  Config,
  ConfigWithExtendsOrArray,
  LooseRuleDefinition,
  Rules,
} from '$types/index.ts';
import eslintJs from '@eslint/js';

const getScopedConfig = (config: Config): Config => {
  return R.pick(config, ['files', 'ignores']);
};

const isDeprecatedRule = (rule: LooseRuleDefinition): boolean => {
  const isDeprecatedInMeta =
    'meta' in rule &&
    rule.meta &&
    'deprecated' in rule.meta &&
    rule.meta.deprecated === true;

  return isDeprecatedInMeta ?? false;
};

export const defineConfig = (configs: ConfigWithExtendsOrArray[]): Config[] => {
  const eslintConfigs: Config[] = [];
  const flatConfigs = R.flat(configs);

  R.forEach(flatConfigs, (config) => {
    if (!config.extends) {
      eslintConfigs.push(config);
      return;
    }

    const flatExtends = R.flat(config.extends);

    R.forEach(flatExtends, (subConfig) => {
      const scopedConfig = getScopedConfig(config);
      eslintConfigs.push(R.merge(subConfig, scopedConfig));
    });

    eslintConfigs.push(R.omit(config, ['extends']));
  });

  return R.pipe(eslintConfigs, R.map(R.omitBy(R.isNullish)));
};

export const injectAllRules = (configs: Config[]): Config[] => {
  const allRulesConfigs: Config[] = [eslintJs.configs.all];

  R.forEach(configs, (config) => {
    if (!config.plugins) {
      return;
    }

    const scopedConfig = getScopedConfig(config);
    const pluginsEntries = R.entries(config.plugins);

    R.forEach(pluginsEntries, ([pluginName, plugin]) => {
      if (!plugin.rules) {
        return;
      }

      const allRules: Rules = R.pipe(
        plugin.rules,
        R.omitBy(isDeprecatedRule),
        R.keys(),
        R.mapToObj((ruleName) => {
          return [`${pluginName}/${ruleName}`, 'error'];
        }),
      );

      scopedConfig.rules = R.merge(scopedConfig.rules, allRules);
    });

    allRulesConfigs.push(scopedConfig);
  });

  return R.concat(allRulesConfigs, configs);
};
