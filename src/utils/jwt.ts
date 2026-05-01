import jwt from "jsonwebtoken";
import { env } from "../env.js";

export function generateToken(user: { id: string; role: string }) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
}