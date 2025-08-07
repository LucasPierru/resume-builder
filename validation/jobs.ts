import { z } from "zod";

export const jobGenerationSchema = z.object({
  content: z.string().min(1, "field-required"),
})

export type JobGeneration = z.infer<typeof jobGenerationSchema>;