import { defineConfig } from '$utilities/index.ts';
import eslintJs from '@eslint/js';

export const createBuiltInConfig = () => {
  return defineConfig([eslintJs.configs.recommended]);
};
