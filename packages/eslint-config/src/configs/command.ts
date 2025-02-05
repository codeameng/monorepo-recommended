import { builtinCommands } from 'eslint-plugin-command/commands';
import command from 'eslint-plugin-command/config';

import { defineInfiniteDepthFlatConfig } from '../utilities.ts';
import type { FlatConfig } from '../utilities.ts';

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
