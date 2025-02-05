import type { FlatConfigItem } from 'eslint-config-flat-gitignore';
import gitignore from 'eslint-config-flat-gitignore';

const createIgnoreConfig = function (): FlatConfigItem {
  return gitignore({
    strict: true,
    root: true,
    files: ['.gitignore'],
  });
};

export { createIgnoreConfig };
