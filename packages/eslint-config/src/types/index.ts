import { ConfigArray } from 'typescript-eslint';

export type Config = ConfigArray[number];
export type ConfigOrArray = Config | Config[];
