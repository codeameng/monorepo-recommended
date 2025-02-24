import { ConfigArray } from 'typescript-eslint';

export type Config = ConfigArray[number];

type ConfigOrArray = Config | Config[];

export interface ConfigWithExtends extends Config {
  extends?: ConfigOrArray[];
}

export type ConfigWithExtendsOrArray = ConfigWithExtends | ConfigWithExtends[];

export interface StrictConfigWithExtends {
  name: ConfigWithExtends['name'];
  files: ConfigWithExtends['files'];
  extends: ConfigWithExtends['extends'];
}

export type Plugin = NonNullable<Config['plugins']>[string];

export type LooseRuleDefinition = NonNullable<Plugin['rules']>[string];

export type Rules = NonNullable<Config['rules']>;
