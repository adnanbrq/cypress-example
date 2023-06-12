import { z } from "zod";

export const PostViewSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string().min(1),
});

export type PostView = z.infer<typeof PostViewSchema>;
