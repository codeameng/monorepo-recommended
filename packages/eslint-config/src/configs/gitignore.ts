import { R } from '@packages/utils';
import eslintConfigFlatGitignore, {
  FlatConfigItem,
} from 'eslint-config-flat-gitignore';
import { simpleGit } from 'simple-git';
import path from 'path';

async function getGitignoreFiles(rootDirectory: string) {
  const git = simpleGit(rootDirectory);
  const allFiles = await git.raw([
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
  ]);

  return R.pipe(
    allFiles,
    R.split(/\r?\n/),
    R.filter(R.endsWith('.gitignore')),
    R.map((file) => path.join(rootDirectory, file)),
  );
}

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
