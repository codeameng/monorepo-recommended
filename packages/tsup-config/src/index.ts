import type { Options } from 'tsup';

export const tsupConfig: Options = {
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
};
