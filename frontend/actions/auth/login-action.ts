"use server";

import { createLoginSession } from "@/libs/auth/manage-login";
import { LoginSchema } from "@/libs/auth/schema-login";
import { apiRequest } from "@/utils/api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(
  state: LoginActionState | undefined,
  formData: FormData
) {
  if (!(formData instanceof FormData)) {
    return {
      email: "",
      errors: ["Dados inválidos"],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formUser = formObj?.email?.toString() || "";

  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formUser,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>("/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!loginResponse.success) {
    return {
      email: formUser,
      errors: loginResponse.errors,
    };
  }

  await createLoginSession(loginResponse.data.accessToken);
  redirect("/dashboard");
}
