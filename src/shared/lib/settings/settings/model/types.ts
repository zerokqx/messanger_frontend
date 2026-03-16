import type { MantineRadiusValues } from '@mantine/core';
import { z } from 'zod';

export const AnimationSchema = z.enum(['spring', 'keyframes']);

export const PrimaryColorSchema = z.enum([
  'blue',
  'indigo',
  'red',
  'green',
  'gray',
  'violet',
]);
type RadiusKey = keyof MantineRadiusValues;

const radiusDefaults: MantineRadiusValues = {
  xs: '0px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

const radiusShape = {
  xs: z.string().default(radiusDefaults.xs),
  sm: z.string().default(radiusDefaults.sm),
  md: z.string().default(radiusDefaults.md),
  lg: z.string().default(radiusDefaults.lg),
  xl: z.string().default(radiusDefaults.xl),
} satisfies Record<RadiusKey, z.ZodType<string>>;
export const RadiusSchema = z.object(radiusShape).default(radiusDefaults);
export const SettingsSchema = z.object({
  animations: AnimationSchema.default('spring'),
  primaryColor: PrimaryColorSchema.default('violet'),
  withAnimations: z.boolean().default(true),
  duratationAllAnimations: z.number().min(0.2).max(1).default(0.6),
  radius: RadiusSchema,
});

export type Settings = z.infer<typeof SettingsSchema>;
export type Radius = z.infer<typeof RadiusSchema>;
