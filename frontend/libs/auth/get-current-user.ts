import { apiAuthenticatedRequest } from "@/utils/api-authenticated-request";
import { PublicUserDto } from "../user/schema";

export async function getCurrentUser(): Promise<PublicUserDto | null> {
  const res = await apiAuthenticatedRequest<PublicUserDto>("/user/me", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return null;
  return res.data;
}
