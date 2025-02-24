import { R } from '@packages/utils';
import {
  Config,
  ConfigWithExtendsOrArray,
  LooseRuleDefinition,
  Rules,
} from '$types/index.ts';
import eslintJs from '@eslint/js';

function getScopedConfig(config: Config): Config {
  return R.pick(config, ['files', 'ignores']);
}

function isDeprecatedRule(rule: LooseRuleDefinition): boolean {
  const isDeprecatedInMeta =
    'meta' in rule &&
    rule.meta &&
    'deprecated' in rule.meta &&
    rule.meta.deprecated === true;

  return isDeprecatedInMeta ?? false;
}

export function defineConfig(configs: ConfigWithExtendsOrArray[]): Config[] {
  const eslintConfigs: Config[] = [];

  for (const config of R.flat(configs)) {
    if (!config.extends) {
      eslintConfigs.push(config);
      continue;
    }

    const extendsConfigs = R.flat(config.extends);

    R.forEach(extendsConfigs, (subConfig) => {
      const scopedConfig = getScopedConfig(config);
      eslintConfigs.push(R.merge(subConfig, scopedConfig));
    });

    eslintConfigs.push(R.omit(config, ['extends']));
  }

  return R.pipe(eslintConfigs, R.map(R.omitBy(R.isNullish)));
}

export function injectAllRules(configs: Config[]): Config[] {
  const allRulesConfigs: Config[] = [eslintJs.configs.all];

  for (const config of configs) {
    if (!config.plugins) {
      continue;
    }

    const scopedConfig = getScopedConfig(config);

    for (const [pluginName, plugin] of R.entries(config.plugins)) {
      if (!plugin.rules) {
        continue;
      }

      const allRules: Rules = R.pipe(
        plugin.rules,
        R.omitBy(isDeprecatedRule),
        R.keys(),
        R.mapToObj((ruleName) => [`${pluginName}/${ruleName}`, 'error']),
      );

      scopedConfig.rules = R.merge(scopedConfig.rules, allRules);
    }

    allRulesConfigs.push(scopedConfig);
  }

  return R.concat(allRulesConfigs, configs);
}
