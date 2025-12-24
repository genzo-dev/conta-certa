import "server-only";
import { apiRequest, ApiRequest } from "./api-request";
import { getLoginSession } from "@/libs/auth/manage-login";

export async function apiAuthenticatedRequest<T>(
  path: string,
  options?: RequestInit
): Promise<ApiRequest<T>> {
  const jwtToken = await getLoginSession();

  if (!jwtToken) {
    return {
      success: false,
      errors: ["Usuário não autenticado."],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
