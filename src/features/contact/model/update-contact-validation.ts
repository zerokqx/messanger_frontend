import z from "zod";

export const UpdateContactSchema = z.object({
  customName: z.string().max(32)
})
