"use client";

import { loginAction } from "@/actions/auth/login-action";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function HomePage() {
  const initialState = {
    email: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);
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
    <section>
      <form action={action} noValidate>
        <input
          type="email"
          name="email"
          placeholder="email"
          disabled={isPending}
          defaultValue={state?.email}
        />

        <input
          type="password"
          name="password"
          placeholder="senha"
          disabled={isPending}
        />

        <button disabled={isPending} type="submit">
          Entrar
        </button>
        {!!state?.errors && <p className="text-red-600">{state.errors}</p>}
      </form>
    </section>
  );
}
