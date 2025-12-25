"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function AuthToasts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userChanged = searchParams.get("userChanged");
  const created = searchParams.get("created");
  const registerUser = searchParams.get("registerUser");

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
      toast.success("Login realizado com sucesso.");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }

    if (registerUser === "1") {
      toast.dismiss();
      toast.success("Seu usuário criado com sucesso.");
      const url = new URL(window.location.href);
      url.searchParams.delete("registerUser");
      router.replace(url.toString());
    }
  }, [userChanged, created, registerUser, router]);

  return null;
}
