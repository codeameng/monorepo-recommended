import { R } from '@packages/utils';
import { resolveConfig, getSupportInfo } from 'prettier';
import { z } from 'zod';

const ConfigSchema = z.object({
  singleQuote: z.boolean(),
});

export const getPrettierConfig = async (): Promise<
  z.infer<typeof ConfigSchema>
> => {
  const defaultOptions: Record<string, unknown> = {};

  const [supportInfo, config] = await Promise.all([
    getSupportInfo(),
    resolveConfig('prettier.config.js'),
  ]);

  for (const option of supportInfo.options) {
    if (R.isEmpty(option.name)) {
      continue;
    }

    defaultOptions[option.name] = option.default;
  }

  return ConfigSchema.parse(R.merge(defaultOptions, config));
};
