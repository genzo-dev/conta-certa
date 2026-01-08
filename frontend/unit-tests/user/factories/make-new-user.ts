type MakeNewUserProps = Partial<{
  id: string;
  userName: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;

export default function makeNewUser(overrides: MakeNewUserProps = {}) {
  return {
    id: crypto.randomUUID(),
    userName: "testUser",
    email: "testUser@email.com",
    passwordHash: "hashedPassword123",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}
