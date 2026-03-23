import { buildServer } from "./app.js";
import { env } from "./env.js";

const start = async () => {
	const server = await buildServer({
		logger: true,
	});

	const serverPort = env.SERVER_PORT;
	console.log(env.SERVER_PORT);

	try {
		const address = await server.listen({ port: serverPort, host: "0.0.0.0" });
		server.log.info(`O servidor está rodando no endereço: ${address}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
