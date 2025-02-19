import eslintConfigFlatGitignore, {
  FlatConfigItem,
} from 'eslint-config-flat-gitignore';

interface Options {
  rootDirectory: string;
}
export function createGitignoreConfig(options: Options): FlatConfigItem {
  const { rootDirectory } = options;

  return eslintConfigFlatGitignore({
    strict: true,
    root: true,
    files: ['.gitignore'],
  });
}
