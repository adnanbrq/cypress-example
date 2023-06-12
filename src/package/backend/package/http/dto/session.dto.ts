import { z } from "zod";
import { zfd } from "zod-form-data";

export const CreateSessionSchema = zfd.formData({
  email: z.string().email(),
  password: z.string().min(1),
});

export type CreateSessionDTO = z.infer<typeof CreateSessionSchema>;
