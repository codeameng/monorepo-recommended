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
} from '$types/index.ts';

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

interface ReadTypescriptAliasPatternsOptions {
  rootDirectory: string;
  typescriptProject: string[];
}

const readTypescriptAliasPatterns = async (
  options: ReadTypescriptAliasPatternsOptions,
): Promise<string[]> => {
  const { rootDirectory, typescriptProject } = options;

  const tsconfigFiles = await globby(typescriptProject, {
    cwd: rootDirectory,
    gitignore: true,
  });
  const aliasPatterns = R.flatMap(tsconfigFiles, (tsconfigFile) => {
    const filename = path.join(rootDirectory, tsconfigFile);
    const configFile = readConfigFile(filename, (filePath) =>
      sys.readFile(filePath),
    );
    const config = parseJsonConfigFileContent(
      configFile.config,
      sys,
      path.dirname(filename),
    );

    return R.pipe(
      config.options.paths ?? {},
      R.keys(),
      R.map((str) => globToRegexp(str).source),
    );
  });

  return aliasPatterns;
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
  readTypescriptAliasPatterns,
};

export { GLOBS } from './globs.ts';

export { R } from './remeda.ts';
