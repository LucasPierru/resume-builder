import { z } from "zod";

export const jobGenerationSchema = z.object({
  content: z.string().min(1, "Content must be at least 1 character long"),
})

export type JobGeneration = z.infer<typeof jobGenerationSchema>;