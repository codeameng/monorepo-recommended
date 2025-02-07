import { builtinCommands } from 'eslint-plugin-command/commands';
import type { FlatConfig } from '$utilities/index.ts';
import command from 'eslint-plugin-command/config';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createCommandConfig = function (): FlatConfig[] {
  return defineInfiniteDepthFlatConfig([
    command({
      commands: builtinCommands.filter(
        (builtinCommand) => builtinCommand.name === 'keep-sorted',
      ),
    }),
  ]);
};

export { createCommandConfig };
