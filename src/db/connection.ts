import { PrismaNeon } from "@prisma/adapter-neon";
import { env } from "env.js";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaNeon(
	{ connectionString: env.DATABASE_URL },
	{ schema: "mySchema" },
);
export const prisma = new PrismaClient({ adapter });
