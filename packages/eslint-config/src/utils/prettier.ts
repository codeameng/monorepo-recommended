import { R } from '@packages/utils';
import { resolveConfig, getSupportInfo } from 'prettier';
import { z } from 'zod';

const ConfigSchema = z.object({
  singleQuote: z.boolean(),
});

const { options } = await getSupportInfo();
const config = await resolveConfig('prettier.config.js');

export const getPrettierConfig = (): z.infer<typeof ConfigSchema> => {
  const defaultOptions: Record<string, unknown> = {};

  for (const option of options) {
    if (R.isEmpty(option.name)) {
      continue;
    }

    defaultOptions[option.name] = option.default;
  }

  return ConfigSchema.parse(R.merge(defaultOptions, config));
};
