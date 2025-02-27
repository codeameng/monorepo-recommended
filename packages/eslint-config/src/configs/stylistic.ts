import type { Config } from '$types/index.ts';
import { defineConfig } from '$utils/index.ts';
// import stylisticEslintPlugin from '@stylistic/eslint-plugin';

export const createStylisticConfig = (): Config[] =>
  defineConfig([
    // {
    //   plugins: {
    //     '@stylistic': stylisticEslintPlugin,
    //   },
    //   rules: {},
    // },
  ]);
