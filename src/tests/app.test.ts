import { expect, test } from "vitest";
import { buildServer } from "..//app.js";

test("Testing que /health route", async () => {
	const app = await buildServer();
	await app.ready();

	const response = await app.inject({
		method: "GET",
		url: "/health",
	});

	expect(response.statusCode).toBe(200);
	expect(await response.json()).toStrictEqual({ status: "OK" });
});
