import { expect, it } from "vitest";
import makeNewUser from "./make-new-user";

it("should create a new user", () => {
  const expectedUser = {
    id: "any-uuid",
    userName: "testUser",
    email: "testUser@email.com",
    passwordHash: "hashedPassword123",
    isActive: true,
  };

  const newUser = makeNewUser();

  expect(newUser.id).toBeTypeOf("string");
  expect(newUser.id.length).toBeGreaterThan(0);

  expect(newUser.createdAt).toBeInstanceOf(Date);
  expect(newUser.updatedAt).toBeInstanceOf(Date);

  expect(newUser.email).toContain("@");
  expect(newUser.email).toBe(expectedUser.email);

  expect(newUser.userName).toBe(expectedUser.userName);
  expect(newUser.isActive).toBe(true);
  expect(newUser.passwordHash).toBe(expectedUser.passwordHash);
});
