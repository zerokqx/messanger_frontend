import { z } from 'zod';

export const AnimationSchema = z.enum(['spring', 'keyframes']);

export const PrimaryColorSchema = z.enum([
  'blue',
  'indigo',
  'red',
  'green',
  'gray',
  "violet",
]);

export const SettingsSchema = z.object({
  animations: AnimationSchema.default('spring'),
  primaryColor: PrimaryColorSchema.default('violet'),
  withAnimations: z.boolean().default(true),
  duratationAllAnimations: z.number().min(0.2).max(1).default(0.6),
});

export type Settings = z.infer<typeof SettingsSchema>;
