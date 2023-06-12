import { z } from "zod";
import { zfd } from "zod-form-data";

export const CreatePostSchema = zfd.formData({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type CreatePostPayload = z.infer<typeof CreatePostSchema>;
