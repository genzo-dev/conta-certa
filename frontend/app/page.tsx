"use client";

import { loginAction } from "@/actions/auth/login-action";
import { useActionState } from "react";

export default function HomePage() {
  const initialState = {
    email: "",
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);
  // TODO: adicionar outras configurações como notificações (toast) com SearchParams e router

  return (
    <section>
      <form action={action}>
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
