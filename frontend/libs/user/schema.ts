import z from "zod";

export const PublicUserSchema = z.object({
  id: z.string().default(""),
  userName: z.string().default(""),
});

export const CreateUserSchema = z.object({
  userName: z.string().trim(),
  email: z.email().trim(),
  password: z.string().trim(),
});

export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
