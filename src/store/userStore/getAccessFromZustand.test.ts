import jwt from "jsonwebtoken";
import { getAccessFromZustand } from "./getAccessFromZustand";
// WARNING: Write test for getAccess

const secret = "test-secret";

function generateTestJwt(payload = { userId: "123" }) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

describe("getAccessFromZustand with real Zod and JWT", () => {
  const validToken = generateTestJwt();

  test("returns true for valid token", () => {
    const validStorageString = JSON.stringify({
      state: { accessToken: { token: validToken } },
    });

    const mockStorage = {
      getItem: jest.fn(() => validStorageString),
    } as unknown as Storage;

    expect(getAccessFromZustand("user-storage", mockStorage)).toBe(true);
  });

  test("returns false for invalid token", () => {
    const invalidToken = "some.invalid.token";

    const invalidStorageString = JSON.stringify({
      state: { accessToken: { token: invalidToken } },
    });

    const mockStorage = {
      getItem: jest.fn(() => invalidStorageString),
    } as unknown as Storage;

    expect(getAccessFromZustand("user-storage", mockStorage)).toBe(false);
  });
});
