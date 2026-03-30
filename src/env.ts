import { configDotenv } from "dotenv";
import z from "zod";

configDotenv({
	path: `.env.${process.env.NODE_ENV || "development"}`,
	quiet: true,
});

const envSchema = z.object({
	POSTGRES_HOST: z.string().nullable(),
	POSTGRES_PORT: z.string().nullable(),
	POSTGRES_USER: z.string().nullable(),
	POSTGRES_DB: z.string().nullable(),
	POSTGRES_PASSWORD: z.string().nullable(),
	DATABASE_URL: z.url().refine((url) => url.startsWith("postgresql://")),
	SERVER_PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
