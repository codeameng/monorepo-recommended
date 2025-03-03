import { R } from '@packages/utils';
import { resolveConfig, getSupportInfo } from 'prettier';
import { z } from 'zod';

const ZodConfig = z.object({
  singleQuote: z.boolean(),
});

type PrettierConfig = z.infer<typeof ZodConfig>;

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

  return ZodConfig.parse(R.merge(defaultOptions, config));
};
