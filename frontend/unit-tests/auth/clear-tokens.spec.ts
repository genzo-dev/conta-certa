import { clearTokens } from "@/libs/auth/manage-login";
import { expect } from "vitest";

const deleteMock = vi.fn();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    delete: deleteMock,
  }),
}));

describe("clearTokens", () => {
  it("should delete access and refresh tokens from cookies", async () => {
    await clearTokens();

    expect(deleteMock).toHaveBeenCalledTimes(2);
    expect(deleteMock).toHaveBeenCalledWith("accessToken");
    expect(deleteMock).toHaveBeenCalledWith("refreshToken");
  });
});
