import z from "zod";

export const chatInputValidation = z.object({
  content: z.string().trim().nonempty()
})
