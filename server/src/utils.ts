import { verify } from "jsonwebtoken";

export const APP_SECRET = "appsecret321";

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export function verifyRequest(context) {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    verify(token, APP_SECRET);
  } else {
    throw new AuthError();
  }
}
