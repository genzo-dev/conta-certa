import { NextRequest, NextResponse } from "next/server";
import { apiRequest } from "./utils/api-request";
import {
  accessTokenExpires,
  refreshTokenExpires,
} from "./utils/expires-time-cookies";
import { clearTokens } from "./libs/auth/manage-login";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (accessToken) {
    const me = await apiRequest("/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (me.success) {
      return NextResponse.next();
    }
    if (!me.success) {
      await clearTokens();
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!accessToken && refreshToken) {
    const newRefresh = await apiRequest<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!newRefresh.success) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!accessToken && refreshToken && newRefresh.success) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", newRefresh.data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + accessTokenExpires), // 15 minutes
        path: "/",
      });
      response.cookies.set("refreshToken", newRefresh.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + refreshTokenExpires), // 7 days
        path: "/",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|register|_next|favicon.ico|imgs|images|icons).*)"], // rotas protegidas
};
