"use server";

import { createLoginSession } from "@/libs/manage-login";
import { apiRequest } from "@/utils/api-request";

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

  const payload = {
    email: formObj.email?.toString() || "",
    password: formObj.password?.toString() || "",
  };

  // TODO: criar LoginSchema com zod:
  // const parseFormData = LoginSchema.safeParse(formObj)

  // if (!parsedFormData.success) {
  //   return {
  //     name: formUser,
  //     errors: getZodErrorMessages(parsedFormData.error.format()),
  //   };
  // }

  const loginResponse = await apiRequest<{ accessToken: string }>("/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!loginResponse.success) {
    return {
      email: formUser,
      errors: loginResponse.errors,
    };
  }

  await createLoginSession(loginResponse.data.accessToken);
}
