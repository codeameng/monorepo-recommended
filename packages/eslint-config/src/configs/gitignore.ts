import { getGitignoreFiles } from '$utils/index.ts';
import eslintConfigFlatGitignore, {
  FlatConfigItem,
} from 'eslint-config-flat-gitignore';

interface Options {
  rootDirectory: string;
}
export async function createGitignoreConfig(
  options: Options,
): Promise<FlatConfigItem> {
  const { rootDirectory } = options;

  const gitignoreFiles = await getGitignoreFiles(rootDirectory);

  return eslintConfigFlatGitignore({
    root: true,
    files: gitignoreFiles,
  });
}
