import { getTokens } from "@/libs/auth/manage-login";
import { expect } from "vitest";

const getMock = vi.fn((key: string) => {
  if (key === "accessToken") return { value: "access-token" };
  if (key === "refreshToken") return { value: "refresh-token" };
  return null;
});

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: getMock,
  }),
}));

describe("getTokens", () => {
  it("should get access and refresh tokens from cookies", async () => {
    const tokens = await getTokens();

    expect(getMock).toHaveBeenCalledTimes(2);
    expect(getMock).toHaveBeenCalledWith("accessToken");
    expect(getMock).toHaveBeenCalledWith("refreshToken");

    expect(tokens.accessToken).toEqual("access-token");
    expect(tokens.refreshToken).toEqual("refresh-token");
  });
});
