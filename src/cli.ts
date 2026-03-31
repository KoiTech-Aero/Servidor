import "dotenv";
import { spawn } from "node:child_process";
import { configDotenv } from "dotenv";
import inquirer from "inquirer";

async function cli() {
	const answers = await inquirer.prompt([
		{
			type: "list",
			name: "environment",
			message: "Qual o ambiente?",
			choices: ["test", "development", "production"],
			validate: (input) => {
				const choices = ["test", "development", "production"];
				if (!choices.includes(input)) {
					return "Invalido";
				}
				return true;
			},
		},
		{
			type: "input",
			name: "command",
			message: "Qual o comando?",
		},
	]);

	console.log(`\n🚀 Rodando em ${answers.environment}...\n`);

	configDotenv({
		path: `.env.${answers.environment}`,
		override: true,
	});

	process.env.NODE_ENV = answers.environment;

	const child = spawn("npm", ["run", answers.command], {
		stdio: "inherit",
		env: {
			...process.env,
			ENV_FILE: process.env.NODE_ENV,
		},
		shell: true,
	});

	child.on("exit", (code) => {
		console.log(`Finalizado com código ${code}`);
	});

	child.on("error", (err) => {
		console.error("Erro ao iniciar:", err);
	});
}

cli();
