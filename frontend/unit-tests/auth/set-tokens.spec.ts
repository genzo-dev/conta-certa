import { setTokens } from "@/libs/auth/manage-login";
import { describe, it, expect, vi } from "vitest";

const setMock = vi.fn();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: setMock,
  }),
}));

describe("setTokens", () => {
  it("should set access and refresh tokens in cookies", async () => {
    await setTokens("access-token", "refresh-token");

    expect(setMock).toHaveBeenCalledTimes(2);

    expect(setMock).toHaveBeenCalledWith(
      "accessToken",
      "access-token",
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      })
    );

    expect(setMock).toHaveBeenCalledWith(
      "refreshToken",
      "refresh-token",
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      })
    );
  });
});
