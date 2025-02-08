declare module 'eslint-plugin-prefer-arrow' {
  import type { Linter } from 'eslint';

  const plugin: NonNullable<Linter.Config['plugins']>[string];

  export default plugin;
}
