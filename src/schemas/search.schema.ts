import { z } from "zod";

export const searchSchema = z.object({
  search: z.string(),
});

export type SearchFormData = z.infer<typeof searchSchema>;
