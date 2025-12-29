"use server";

import { createLoginSession, setTokens } from "@/libs/auth/manage-login";
import { LoginSchema } from "@/libs/auth/schema-login";
import { apiRequest } from "@/utils/api-request";
import { asyncDelay } from "@/utils/async-delay";
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

  await asyncDelay(3000, true);

  if (!parsedFormData.success) {
    return {
      email: formUser,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  const loginResponse = await apiRequest<{
    accessToken: string;
    refreshToken: string;
  }>("/auth", {
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

  console.log("Login successful:", loginResponse.data);

  await setTokens(
    loginResponse.data.accessToken,
    loginResponse.data.refreshToken
  );
  // await createLoginSession(loginResponse.data.accessToken);
  redirect("/?created=1");
}
