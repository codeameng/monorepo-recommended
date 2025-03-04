import { R } from '@packages/utils';
import { resolveConfig, getSupportInfo } from 'prettier';
import { z } from 'zod';

const ConfigSchema = z.object({
  singleQuote: z.boolean(),
});

type PrettierConfig = z.infer<typeof ConfigSchema>;

export const getPrettierConfig = async (): Promise<PrettierConfig> => {
  const { options } = await getSupportInfo();
  const config = await resolveConfig('prettier.config.js');
  const defaultOptions: Record<string, unknown> = {};

  for (const option of options) {
    if (R.isNullish(option.name)) {
      continue;
    }

    defaultOptions[option.name] = option.default;
  }

  return ConfigSchema.parse(R.merge(defaultOptions, config));
};
