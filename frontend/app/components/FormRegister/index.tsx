"use client";

import { loginAction } from "@/actions/auth/login-action";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import InputText from "../InputText";
import Button from "../Button";
import LoaderSpin from "../LoaderSpin";
import { registerAction } from "@/actions/auth/register-action";
import { CreateUserSchema } from "@/libs/user/schema";

export default function FormRegister() {
  const [state, action, isPending] = useActionState(registerAction, {
    user: {
      userName: "",
      email: "",
      password: "",
    },
    errors: [],
    success: false,
  });
  // TODO: adicionar outras configurações como notificações (toast) com SearchParams e router

  const router = useRouter();
  const searchParams = useSearchParams();
  const userChanged = searchParams.get("userChanged");
  const created = searchParams.get("created");

  useEffect(() => {
    if (state?.errors?.length > 0) {
      toast.dismiss();
      toast.error(state.errors.join(", "));
    }
  }, [state]);

  useEffect(() => {
    if (userChanged === "1") {
      toast.dismiss();
      toast.success("Seu usuário foi modificado. Faça login novamente.");
      const url = new URL(window.location.href);
      url.searchParams.delete("userChanged");
      router.replace(url.toString());
    }

    if (created === "1") {
      toast.dismiss();
      toast.success("Seu usuário criado.");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [userChanged, created, router]);

  return (
    <form action={action} className="flex flex-col gap-4 w-full" noValidate>
      <InputText
        labelText="Nome de usuário:"
        type="text"
        name="userName"
        placeholder="Digite seu e-mail..."
        disabled={isPending}
        defaultValue={state.user.userName}
      />

      <InputText
        labelText="E-mail:"
        type="email"
        name="email"
        placeholder="Digite seu e-mail..."
        disabled={isPending}
        defaultValue={state.user.email}
      />

      <InputText
        labelText="Senha:"
        type="password"
        name="password"
        placeholder="Digite sua senha..."
        disabled={isPending}
      />

      <Button type="submit" disabled={isPending}>
        {!isPending && "Criar conta"}
        {isPending && <LoaderSpin />}
      </Button>

      {!!state?.errors && <p className="text-red-600">{state.errors}</p>}
    </form>
  );
}
