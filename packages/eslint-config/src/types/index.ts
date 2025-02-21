import { ConfigArray } from 'typescript-eslint';

export type Config = ConfigArray[number];

type ConfigOrArray = Config | Config[];

interface ConfigWithExtends extends Config {
  extends?: ConfigOrArray[];
}

export type ConfigWithExtendsOrArray = ConfigWithExtends | ConfigWithExtends[];
