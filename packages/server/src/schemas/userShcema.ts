import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z.string(),
  password: z.string().min(8).max(255),
});

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
