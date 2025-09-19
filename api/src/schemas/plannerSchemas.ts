import { z } from 'zod';

export const updateSettingsSchema = z.object({
  monthlyIncome: z.number().nonnegative(),
  recurring: z.number().nonnegative(),
  extraSavings: z.number().nonnegative().optional().default(0),
  days: z.number().int().min(1).max(365),
  mode: z.enum(['soft', 'hard']),
});

export const addSpendingSchema = z.object({
  date: z.string().datetime(),
  amount: z.number().nonnegative(),
  note: z.string().max(255).optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type AddSpendingInput = z.infer<typeof addSpendingSchema>;
