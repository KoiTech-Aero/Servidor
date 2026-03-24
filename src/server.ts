import { buildServer } from "./app.js";
import { env } from "./env.js";

const start = async () => {
	const isDevOrTest =
		process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";
	const server = await buildServer({
		logger: isDevOrTest,
	});

	const serverPort = env.SERVER_PORT;

	try {
		const address = await server.listen({ port: serverPort, host: "0.0.0.0" });
		server.log.info(`O servidor está rodando no endereço: ${address}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
