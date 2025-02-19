import { defineConfig } from '$utils/index.ts';
import eslintJs from '@eslint/js';

export function createBuiltInConfig() {
  return defineConfig([eslintJs.configs.recommended]);
}
