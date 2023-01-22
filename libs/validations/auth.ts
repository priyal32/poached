import * as z from "zod";

export const userAuthSchema = z.object({
  username: z.string(),
  adminPassCode: z.string().min(6).optional(),
  password: z.string().min(6),
});
