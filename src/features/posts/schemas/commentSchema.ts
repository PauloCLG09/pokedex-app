import { z } from "zod";

export const commentSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  comment: z.string().min(10, "Comment must have at least 10 characters"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
