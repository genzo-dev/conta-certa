"use server";
import { clearTokens } from "@/libs/auth/manage-login";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await clearTokens();

  redirect("/login");
}
