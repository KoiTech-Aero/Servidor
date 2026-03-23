import { configDotenv } from "dotenv";
import z from "zod";

configDotenv({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

const envSchema = z.object({
	DATABASE_URL: z.url().refine((url) => url.startsWith("postgresql://")),
	SERVER_PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
