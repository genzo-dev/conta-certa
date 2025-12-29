import { apiAuthenticatedRequest } from "@/utils/api-authenticated-request";
import { cookies } from "next/headers";
import { PublicUserDto } from "../user/schema";
import {
  accessTokenExpires,
  refreshTokenExpires,
} from "@/utils/expires-time-cookies";

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(Date.now() + accessTokenExpires), // 15 minutes
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(Date.now() + refreshTokenExpires), // 7 days
    path: "/",
  });
}

export async function getTokens() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get("accessToken")?.value || null,
    refreshToken: cookieStore.get("refreshToken")?.value || null,
  };
}

export async function clearTokens() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function getCurrentUser(): Promise<PublicUserDto | null> {
  const res = await apiAuthenticatedRequest<PublicUserDto>("/user/me", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return null;
  console.log("Dados do usuário:", res.data);
  return res.data;
}
