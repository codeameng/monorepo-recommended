import { createConfig } from '@packages/eslint-config';

export default createConfig({
  presetOptions: {
    rootDirectory: import.meta.dirname,
  },
});
