"use client";

import { useActionState } from "react";
import InputText from "../InputText";
import Button from "../Button";
import LoaderSpin from "../LoaderSpin";
import { registerAction } from "@/actions/user/register-action";
import { PublicUserSchema } from "@/libs/user/schema";

export default function FormRegister() {
  const [state, action, isPending] = useActionState(registerAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <InputText
        labelText="Nome de usuário:"
        type="text"
        name="userName"
        placeholder="Digite seu e-mail..."
        disabled={isPending}
        defaultValue={state.user?.userName}
      />

      <InputText
        labelText="E-mail:"
        type="email"
        name="email"
        placeholder="Digite seu e-mail..."
        disabled={isPending}
      />

      <InputText
        labelText="Senha:"
        type="password"
        name="password"
        placeholder="Digite sua senha..."
        disabled={isPending}
      />

      <InputText
        labelText="Confirme a senha:"
        type="password"
        name="password2"
        placeholder="Digite sua senha..."
        disabled={isPending}
      />

      <Button type="submit" disabled={isPending}>
        {!isPending && "Criar conta"}
        {isPending && <LoaderSpin />}
      </Button>

      {!!state?.errors && <p className="text-red-600">{state.errors[0]}</p>}
    </form>
  );
}
