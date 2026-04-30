import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { buildServer } from "./app.js";
import { PrismaError } from "./entidades/prismaError.js";
import { env } from "./env.js";

const start = async () => {
	const isDevOrTest =
		process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";
	const server = await buildServer({
		logger: isDevOrTest,
	});

	const serverPort = env.SERVER_PORT;

	try {
		await server.prisma.$connect();
		await server.prisma.$queryRaw`SELECT 1`;
		const address = await server.listen({ port: serverPort, host: "0.0.0.0" });
		server.log.info(`O servidor está rodando no endereço: ${address}`);
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			throw new PrismaError(
				"Não foi possivel conectar ao banco",
				500,
				e.code,
				"Query Error",
			);
		}
		server.log.error(e);
		process.exit(1);
	}
};

start();
