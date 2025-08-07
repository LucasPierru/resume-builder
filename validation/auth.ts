import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("invalid-email"),
  password: z.string().min(6, "password-too-short"),
})

export type Login = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email("invalid-email"),
  name: z.string().min(1, "full-name-required"),
  password: z.string().min(6, "password-too-short"),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'password-mismatch',
      path: ['confirmPassword']
    });
  }
});

export type Register = z.infer<typeof registerSchema>;