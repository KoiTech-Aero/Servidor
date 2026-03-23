import { configDotenv } from "dotenv";
import { defineConfig } from "prisma/config";

configDotenv({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

export default defineConfig({
	schema: "prisma/",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: process.env.DATABASE_URL,
	},
});
