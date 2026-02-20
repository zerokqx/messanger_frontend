import z from 'zod';

export const LanguageSchema = z.enum(['en', 'ru']);
export type LanguageValue = z.infer<typeof LanguageSchema>;
export type LanguageSet = { value: LanguageValue; label: string }[];
