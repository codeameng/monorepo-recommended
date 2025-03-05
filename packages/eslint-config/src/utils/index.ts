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

  for (const config of flatConfigs) {
    if (!config.extends) {
      eslintConfigs.push(config);
      continue;
    }

    const flatExtends = R.flat(config.extends);

    for (const subConfig of flatExtends) {
      const scopedConfig = getScopedConfig(config);

      eslintConfigs.push(R.merge(subConfig, scopedConfig));
    }

    eslintConfigs.push(R.omit(config, ['extends']));
  }

  return R.pipe(eslintConfigs, R.map(R.omitBy(R.isNullish)));
};

export const injectAllRules = (configs: Config[]): Config[] => {
  const allRulesConfigs: Config[] = [eslintJs.configs.all];

  for (const config of configs) {
    if (!config.plugins) {
      continue;
    }

    const scopedConfig = getScopedConfig(config);
    const pluginsEntries = R.entries(config.plugins);

    for (const [pluginName, plugin] of pluginsEntries) {
      if (!plugin.rules) {
        continue;
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
    }

    allRulesConfigs.push(scopedConfig);
  }

  return R.concat(allRulesConfigs, configs);
};
