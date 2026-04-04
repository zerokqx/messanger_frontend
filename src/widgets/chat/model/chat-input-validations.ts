import z from "zod";

export const  MAX_MESSAGE_LENGHT=4096
export const chatInputValidation = z.object({
  content: z.string().trim().max(MAX_MESSAGE_LENGHT).nonempty()
})
