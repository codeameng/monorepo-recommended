import path from 'path';

import eslintJs from '@eslint/js';
import globToRegexp from 'glob-to-regexp';
import { globby } from 'globby';
import pProps from 'p-props';
import { getSupportInfo, resolveConfig } from 'prettier';
import { parseJsonConfigFileContent, readConfigFile, sys } from 'typescript';
import { z } from 'zod';

import type {
  Config,
  ConfigWithExtendsOrArray,
  LooseRuleDefinition,
  Rules,
} from '~types/index.ts';

import { R } from './remeda.ts';

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

const defineESLintConfig = (configs: ConfigWithExtendsOrArray[]): Config[] => {
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

const readTypescriptAliases = async (options: {
  rootDirectory: string;
  typescriptProject: string[];
}): Promise<{ paths: string[]; patterns: string[] }> => {
  const { rootDirectory, typescriptProject } = options;

  const tsconfigFiles = await globby(typescriptProject, {
    cwd: rootDirectory,
    gitignore: true,
    absolute: true,
  });
  const paths = R.flatMap(tsconfigFiles, (tsconfigFile) => {
    const configFile = readConfigFile(tsconfigFile, (filePath) =>
      sys.readFile(filePath),
    );
    const config = parseJsonConfigFileContent(
      configFile.config,
      sys,
      path.dirname(tsconfigFile),
    );

    return R.keys(config.options.paths ?? {});
  });
  const patterns = R.map(paths, (alias) => globToRegexp(alias).source);

  return {
    paths,
    patterns,
  };
};

const injectAllRules = (configs: Config[]): Config[] => {
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
        R.mapToObj((ruleName) => [`${pluginName}/${ruleName}`, 'error']),
      );

      scopedConfig.rules = R.merge(scopedConfig.rules, allRules);
    }

    allRulesConfigs.push(scopedConfig);
  }

  return R.concat(allRulesConfigs, configs);
};

const ConfigSchema = z.object({
  singleQuote: z.boolean(),
});

const getPrettierConfig = async (): Promise<z.infer<typeof ConfigSchema>> => {
  const defaultOptions: Record<string, unknown> = {};

  const { supportInfo, config } = await pProps({
    supportInfo: getSupportInfo(),
    config: resolveConfig('prettier.config.js'),
  });

  for (const option of supportInfo.options) {
    if (R.isEmpty(option.name)) {
      continue;
    }

    defaultOptions[option.name] = option.default;
  }

  return ConfigSchema.parse(R.merge(defaultOptions, config));
};

export {
  defineESLintConfig,
  getPrettierConfig,
  injectAllRules,
  readTypescriptAliases,
};

export { GLOBS } from './globs.ts';

export { R } from './remeda.ts';
