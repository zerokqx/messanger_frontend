import z from "zod";
import { loginFormSchema } from "./loginForm";

export const registerFormSchema = loginFormSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );
