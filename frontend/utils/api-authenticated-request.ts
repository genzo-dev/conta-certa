import "server-only";
import { apiRequest, ApiRequest } from "./api-request";
import { getTokens } from "@/libs/auth/manage-login";

export async function apiAuthenticatedRequest<T>(
  path: string,
  options?: RequestInit
): Promise<ApiRequest<T>> {
  const jwtToken = await getTokens();

  if (!jwtToken?.accessToken) {
    return {
      success: false,
      errors: ["Usuário não autenticado."],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken.accessToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
