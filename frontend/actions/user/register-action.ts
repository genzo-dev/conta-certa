"use server";

import { createLoginSession } from "@/libs/auth/manage-login";
import { LoginSchema } from "@/libs/auth/schema-login";
import {
  CreateUserDto,
  CreateUserSchema,
  PublicUserSchema,
} from "@/libs/user/schema";
import { apiRequest } from "@/utils/api-request";
import { asyncDelay } from "@/utils/async-delay";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type RegisterActionState = {
  user: Partial<CreateUserDto> | null;
  errors: string[];
  success: boolean;
};

export async function registerAction(
  state: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ["Dados inválidos"],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  await asyncDelay(3000, true);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  // const loginResponse = await apiRequest<{ accessToken: string }>("/auth", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(parsedFormData.data),
  // });

  // if (!loginResponse.success) {
  //   return {
  //     name: formUser,
  //     email: formUser,
  //     errors: loginResponse.errors,
  //   };
  // }

  // await createLoginSession(loginResponse.data.accessToken);

  const registerResponse = await apiRequest<{ accessToken: string }>("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!registerResponse.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: registerResponse.errors,
      success: registerResponse.success,
    };
  }

  redirect("/dashboard");
}
