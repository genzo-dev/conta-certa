import z from "zod";

export const PublicUserSchema = z.object({
  id: z.string().default(""),
  userName: z.string().default(""),
});

const CreateUserBase = z.object({
  userName: z.string().trim().nonempty("Informe um nome de usuário"),
  email: z.string().email("Informe um e-mail válido").trim(),
  password: z.string().trim().nonempty("Informe sua senha"),
  password2: z.string().trim(),
});

export const CreateUserSchema = CreateUserBase.refine(
  (data) => {
    return data.password === data.password2;
  },
  {
    path: ["password2"],
    message: "As senhas não coincidem",
  }
).transform(({ userName, email, password }) => {
  return { userName, email, password };
});

export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
