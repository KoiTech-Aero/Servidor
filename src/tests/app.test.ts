import { expect, test } from "vitest";
import { buildServer } from "..//app.js";

test("Testing que /health route", async () => {
	const fastify = await buildServer();
	await fastify.ready();

	const response = await fastify.inject({
		method: "GET",
		url: "/health",
	});

	expect(response.statusCode).toBe(200);
	expect(await response.json()).toStrictEqual({ status: "OK" });
});
