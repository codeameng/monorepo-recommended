import { builtinCommands } from 'eslint-plugin-command/commands';
import command from 'eslint-plugin-command/config';

import type { FlatConfig } from '$utilities/index.ts';

import { defineInfiniteDepthFlatConfig } from '$utilities/index.ts';

const createCommandConfig = (): FlatConfig[] => {
  return defineInfiniteDepthFlatConfig([
    command({
      commands: builtinCommands.filter((builtinCommand) => {
        return builtinCommand.name === 'keep-sorted';
      }),
    }),
  ]);
};

export { createCommandConfig };
