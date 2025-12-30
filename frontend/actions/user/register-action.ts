"use server";

import { setTokens } from "@/libs/auth/manage-login";
import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from "@/libs/user/schema";
import { apiRequest } from "@/utils/api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type RegisterActionState = {
  user: PublicUserDto;
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

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

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
      user: PublicUserSchema.parse(formObj),
      errors: loginResponse.errors,
      success: registerResponse.success,
    };
  }
  await setTokens(
    loginResponse.data.accessToken,
    loginResponse.data.refreshToken
  );

  redirect("/?registerUser=1");
}
