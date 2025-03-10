import type { ConfigArray } from 'typescript-eslint';

type Config = ConfigArray[number];
type ConfigOrArray = Config | Config[];

interface ConfigWithExtends extends Config {
  extends?: ConfigOrArray[];
}
type ConfigWithExtendsOrArray = ConfigWithExtends | ConfigWithExtends[];
interface StrictConfigWithExtends {
  extends: ConfigWithExtends['extends'];
  files: ConfigWithExtends['files'];
  name: ConfigWithExtends['name'];
}

type Plugin = NonNullable<Config['plugins']>[string];

type LooseRuleDefinition = NonNullable<Plugin['rules']>[string];

type Rules = NonNullable<Config['rules']>;

export type {
  Config,
  ConfigWithExtends,
  ConfigWithExtendsOrArray,
  LooseRuleDefinition,
  Plugin,
  Rules,
  StrictConfigWithExtends,
};
