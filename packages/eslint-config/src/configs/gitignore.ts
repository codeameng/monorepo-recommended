import { getGitignoreFiles } from '$utils/index.ts';
import eslintConfigFlatGitignore, {
  FlatConfigItem,
} from 'eslint-config-flat-gitignore';

interface GitignoreOptions {
  rootDirectory: string;
}
export async function createGitignoreConfig(
  options: GitignoreOptions,
): Promise<FlatConfigItem> {
  const { rootDirectory } = options;

  const gitignoreFiles = await getGitignoreFiles(rootDirectory);

  return eslintConfigFlatGitignore({
    root: true,
    files: gitignoreFiles,
  });
}
