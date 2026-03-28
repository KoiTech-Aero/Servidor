# Servidor

## Requisitos

- Node 24.14.1
- Docker

## Instalação do Node

- Vá até o link: [Download Node](https://nodejs.org/pt-br/download)
- Faça a instalção do NodeJS
- Para verificar a instalação, vá até o terminar e digite `node -v` e `npm -v`

## Instalação do Docker no Linux

- Vá até o link e siga as instruções: [Instalação Linux Docker](https://docs.docker.com/desktop/setup/install/linux/)

## Instalação do Docker no Windows

- Vá até o link e siga as instruções: [Instalação Windows Docker](https://docs.docker.com/desktop/setup/install/windows-install/)

## Setup Variaveis de ambiente

- Utilize o arquivo `.env.sample` como template, então, a partir desse arquivo, dependendo do ambiente, crie o arquivo .env.`ambiente`, exemplo .env.test, ambientes possiveis são `test, development, production`. Por padrão, mesmo que não seja o ambiente, deixe configurado o `.env.test`.

## Setup projeto para desenvolvimento e testes

- Para iniciar o projeto, tanto para testes quanto para desenvolvimento, é possivel configurar o ambiente através do comando `npm run cli`, passe os argumentos para o terminal e tudo executará no ambiente correto

## Instalar bibliotecas

- Lembre-se de instalar nossas dependencias, com o comando `npm i`

## Commitar com o commitizen

- Commitar usando o commitzen é simples, siga o fluxo normal do git `git add .`, etc. Pórem, ao fim de tudo, ao invés de usar `git commit...` use `npx cz`
