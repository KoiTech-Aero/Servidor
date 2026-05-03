# Plataforma de Conteúdo Técnico de Normas Aeronáuticas

<p align="center">
  <img width="200" alt="koitech_logo" src="https://i.imgur.com/YugGoAM.png" />
</p>

<div align="center">
  <b>KOITECH</b>
</div>

<p align="center">
  <a href ="#tecnologias">Tecnologias</a> |
  <a href ="#problema"> Problema</a>  |
  <a href ="#solucao"> Solução</a>  |   
  <a href ="#backlog"> Backlog do Produto</a>  |
  <a href ="#cronograma"> Cronograma de Sprints</a>  |
  <a href ="#estrutura">Estrutura do Projeto</a>  |
  <a href ="#manual">Manual de Instalação</a>  | 
  <a href ="#equipe"> Equipe</a>
</p>

## 💻 Tecnologias e plataformas utilizadas<a id="tecnologias"></a>

<h4 align="center">
 <a><img src="https://img.shields.io/badge/HTML-f06529?logo=html5&style=for-the-badge&google&colab&logoColor=white"></a>
 <a><img src="https://img.shields.io/badge/Css-298fca?style=for-the-badge&logo=css&logoColor=White"></a>
 <a><img src="https://img.shields.io/badge/JavaScript-FFEA00?style=for-the-badge&logo=javascript&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&style=for-the-badge&logoColor=white"></a>
<br>
<a><img src="https://img.shields.io/badge/Prisma-f06529?logo=prisma&style=for-the-badge&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&style=for-the-badge&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/Fastify-000000?logo=fastify&style=for-the-badge&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&style=for-the-badge&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&style=for-the-badge&logoColor=white"></a>
<a><img src="https://img.shields.io/badge/Git-191919?style=for-the-badge&logo=git&logoColor=white"></a>
 <br>
 <a><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/></a>
 <a><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/></a>
 <a><img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"/></a>
</h4>

<br>

## 📌 Problema <a id="problema"></a>

Nosso cliente utiliza uma grande quantidade de normas técnicas em suas atividades de engenharia, que são fundamentais para garantir conformidade e qualidade nos projetos. No entanto, a busca e identificação das normas aplicáveis ainda é um processo demorado e pouco estruturado, dificultando o acesso rápido às informações necessárias e impactando a eficiência das atividades técnicas.

## 📌 Solução <a id="solucao"></a>

A solução proposta consiste no desenvolvimento de um sistema para gerenciamento de normas técnicas, permitindo organizar, registrar e consultar normas de forma estruturada. A plataforma oferecerá recursos de busca, classificação e rastreabilidade das informações, facilitando o acesso às normas aplicáveis e tornando o processo mais ágil e eficiente.

## 📦 Repositórios do Projeto
| 📁 Repositório   | 🔗 Link |
|------------------|------------------------|
| 📚 Documentação  | [Acessar](https://github.com/KoiTech-Aero/Documentos)|
| 🖥️ Servidor      | [Acessar](https://github.com/KoiTech-Aero/Servidor)  |
| 🌐 Frontend      | [Acessar](https://github.com/KoiTech-Aero/Frontend)  |

## 🗺️ Roadmap <a id="roadmap"></a>

|        📍 **Entrega 1**        |    📍 **Entrega 2**     |        📍 **Entrega 3**        |
| :----------------------------: | :---------------------: | :----------------------------: |
| **Estrutura básica de normas** | **Organização e busca** | **Interações e administração** |

## 📝 PRODUCT BACKLOG <a id="backlog"></a>

🟩 - Concluído
🟨 - Em andamento
❌ - Não iniciado

| RANK | PRIORIDADE | USER STORY                                                                                                                          | STORY POINTS | SPRINT | STATUS |
| :--: | :--------: | :---------------------------------------------------------------------------------------------------------------------------------- | :----------: | :----: | :----: |
|  1   |    alta    | Como gestor do sistema quero cadastrar uma nova norma para que ela esteja disponível no sistema                                     |      7       |   1    |   🟩   |
|  2   |    alta    | Como engenheiro quero listar normas ativas para saber quais são válidas para uso                                                    |      7       |   1    |   🟩   |
|  3   |   média    | Como gestor do sistema quero registrar versões de uma norma para manter histórico e rastreabilidade                                 |      8       |   1    |   🟩   |
|  4   |   baixa    | Como gestor do sistema quero associar uma norma a outras normas referenciadas para representar as dependências entre normas         |      5       |   1    |   🟩   |
|  5   |   baixa    | Como engenheiro quero visualizar quais normas são referenciadas por uma norma para entender suas dependências técnicas              |      7       |   1    |   🟩   |
|  6   |    alta    | Como engenheiro quero pesquisar normas pelo código ou pelo nome para encontrar rapidamente uma norma específica                     |      6       |   2    |   ❌   |
|  7   |   média    | Como gestor do sistema quero cadastrar novas tags para classificar normas de forma padronizada                                      |      5       |   2    |   ❌   |
|  8   |   média    | Como gestor do sistema quero associar tags às normas para melhorar a organização e busca                                            |      5       |   2    |   ❌   |
|  9   |   média    | Como engenheiro quero pesquisar normas por palavras-chave (tags) para encontrar normas relacionadas a um tema técnico               |      7       |   2    |   ❌   |
|  10  |    alta    | Como engenheiro quero solicitar uma nota para uma norma para registrar observações ou interpretações técnicas                       |      8       |   3    |   ❌   |
|  11  |    alta    | Como gestor do sistema quero cadastrar novos usuários no sistema para que eles possam acessar a plataforma conforme suas permissões |      5       |   3    |   ❌   |
|  12  |   média    | Como gestor do sistema quero aprovar ou rejeitar notas solicitadas para controlar o conteúdo exibido no sistema                     |      7       |   3    |   ❌   |
|  13  |   média    | Como engenheiro quero visualizar as notas aprovadas em uma norma para entender observações relevantes                               |      7       |   3    |   ❌   |
|  14  |   baixa    | Como engenheiro quero solicitar o cadastro de uma norma para que ela seja adquirida ou cadastrada pela empresa                      |      7       |   3    |   ❌   |
|  15  |   baixa    | Como gestor do sistema quero visualizar a lista de usuários cadastrados para que eu possa gerenciar quem tem acesso ao sistema      |      4       |   3    |   ❌   |
|  16  |   baixa    | Como gestor do sistema quero alterar dados ou permissões de um usuário para que eu possa ajustar seu acesso quando necessário       |      5       |   3    |   ❌   |
|  17  |   baixa    | Como gestor do sistema quero desativar usuários para que eles não tenham mais acesso ao sistema                                     |      4       |   3    |   ❌   |

## 📅 Cronograma de Sprints <a id="cronograma"></a>

| Sprint          |     Período      | Documentação                                                                                    | Demonstração     |
| --------------- | :--------------: | ----------------------------------------------------------------------------------------------- | ---------------- |
| 🔖 **SPRINT 1** | 🗓️ 16/03 - 05/04 | 📄 [Sprint 1 Docs](https://github.com/KoiTech-Aero/Documentos/blob/main/sprints/SPRINT%2001.md) | 🎥 [Ver Demo](https://www.youtube.com/watch?v=e-QOllVsI6s) |
| 🔖 **SPRINT 2** | 🗓️ 13/04 - 03/05 | 📄 [Sprint 2 Docs](https://github.com/KoiTech-Aero/Documentos/blob/main/sprints/SPRINT%2002.md) | 🎥 [Ver Demo](#) |
| 🔖 **SPRINT 3** | 🗓️ 11/05 - 31/05 | 📄 [Sprint 3 Docs](https://github.com/KoiTech-Aero/Documentos/blob/main/sprints/SPRINT%2003.md) | 🎥 [Ver Demo](#) |

## 🪵 Branch Strategy <a id="branchstrategy"></a>

Github Flow foi a estrátegia escolhida por ser fácil e rápida de trabalhar, perfeita para equipes pequenas, além de se adequar a projetos que não são construido através de versões. Github Flow possui algumas regras básicas:

- A branch `main` é sempre deployable
- Nova branch para cada nova feature
- Commits com mensagens simples e claras
- Pull Requests para features concluidas
- Merge as branchs caso tudo esteja de acordo

## 🦴 Estrutura do Projeto <a id="estrutura"></a>

**Back-end**

```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ linting.yaml
├── 📁 .husky
│   └── 📄 commit-msg
├── 📁 infra
│   ├── 📁 scripts
│   │   └── 📄 wait-for-postgres.js
│   └── ⚙️ compose.yaml
├── 📁 prisma
│   ├── 📁 migrations
│   │   ├── 📁 20260318222918_init
│   │   │   └── 📄 migration.sql
│   │   ├── 📁 20260324174503_add_escopo_to_normal
│   │   │   └── 📄 migration.sql
│   │   └── ⚙️ migration_lock.toml
│   ├── 📁 models
│   │   ├── 📄 norma-referencia.prisma
│   │   ├── 📄 normas-tags.prisma
│   │   ├── 📄 normas.prisma
│   │   ├── 📄 nota.prisma
│   │   ├── 📄 solicitacao.prisma
│   │   ├── 📄 tag.prisma
│   │   ├── 📄 usuario.prisma
│   │   └── 📄 versao.prisma
│   └── 📄 schema.prisma
├── 📁 src
│   ├── 📁 entidades
│   │   ├── 📄 NormaReferenciaRepository.ts
│   │   ├── 📄 NormaRepository.ts
│   │   ├── 📄 VersaoRepository.ts
│   │   └── 📄 prismaError.ts
│   ├── 📁 plugin
│   │   └── 📄 db-connector.ts
│   ├── 📁 repositories
│   │   └── 📁 prisma
│   │       ├── 📄 PrismaNormaReferenciaRepository.ts
│   │       ├── 📄 PrismaNormaRepository.ts
│   │       └── 📄 PrismaVersaoRepository.ts
│   ├── 📁 routes
│   │   ├── 📁 tests
│   │   │   ├── 📄 get-norma.test.ts
│   │   │   └── 📄 post-norma.test.ts
│   │   ├── 📄 delete-relacionar-norma.ts
│   │   ├── 📄 get-norma.ts
│   │   ├── 📄 get-relacionar-norma.ts
│   │   ├── 📄 post-norma.ts
│   │   ├── 📄 post-relacionar-norma.ts
│   │   └── 📄 post-versao.ts
│   ├── 📁 services
│   │   ├── 📄 associateNorma.ts
│   │   ├── 📄 createNorma.ts
│   │   ├── 📄 createVersao.ts
│   │   ├── 📄 deleteNorma.ts
│   │   ├── 📄 readNorma.ts
│   │   └── 📄 readNormaReferencia.ts
│   ├── 📁 tests
│   │   └── 📄 app.test.ts
│   ├── 📁 types
│   │   ├── 📄 conditions.ts
│   │   └── 📄 getNormaResponse.ts
│   ├── 📄 app.ts
│   ├── 📄 cli.ts
│   ├── 📄 env.ts
│   └── 📄 server.ts
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 commitlint.config.js
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 prisma.config.ts
├── ⚙️ tsconfig.json
└── 📄 vitest.config.ts
```

**Front-end**

```
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 BarraPesquisa.jsx
│   │   ├── 📄 FiltroArea.jsx
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 Menu.jsx
│   │   └── 📄 NormaPreview.jsx
│   ├── 📁 layouts
│   │   └── 📄 LayoutSistema.jsx
│   ├── 📁 pages
│   │   ├── 📄 CadastrarNorma.jsx
│   │   ├── 📄 CadastrarVersao.jsx
│   │   ├── 📄 PesquisarNorma.jsx
│   │   ├── 📄 VisualizarNorma.jsx
│   │   └── 📄 VisualizarVersao.jsx
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
```

## 💻 Manual do usuário <a id="manual"></a>

### Servidor

```
Requisitos:
 - Nodejs 24.14.1
 - Docker
```

```
Como executar:
 - Clonar o repositório com o comando: git clone https://github.com/KoiTech-Aero/Servidor.git
 - Dentro de "Servidor", executar a sequência de comandos
 	npm install
 	cp .env.sample .env.test
 	npx prisma generate dev
 	npm run cli (parâmetros: test; db:up)
 	npm run cli (parâmetros: test; dev)
```

### Frontend

```
Requisitos:
 - Nodejs 24.14.1
```

```
Como executar:
 - Clonar o repositório com o comando: git clone https://github.com/KoiTech-Aero/Frontend.git
 - Dentro de "Frontend", executar a sequência de comandos:
 	npm install
 	npm run dev
```

## 👥 EQUIPE <a id="equipe"></a>

|       MEMBRO        |     PAPEL     |                                                                        GITHUB                                                                        |                                                                                      LINKEDIN                                                                                       |
| :-----------------: | :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Guilherme Alvarenga | Product Owner |   <a href="https://github.com/hiGuigo"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>    | <a href="https://www.linkedin.com/in/guilherme-alvarenga-0834b938a/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> |
|    Mariana Souza    | Scrum Master  | <a href="https://github.com/nevesmariana"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a> |                             <a href="#"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>                              |
|   Giovana Tarozo    | Desenvolvedor |   <a href="https://github.com/giotrzz"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>    |   <a href="https://www.linkedin.com/in/giovana-tarozo-a10922226/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>    |
|     João Souza      | Desenvolvedor | <a href="https://github.com/joao-luis-0"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>  |           <a href="http://www.linkedin.com/in/joão-luis--"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>           |
|    Lucas Silva Pereira    | Desenvolvedor |    <a href="http://github.com/lupesii"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>    |                              <a href=""><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>                              |
|    Rayssa Rizzi     | Desenvolvedor | <a href="https://github.com/rayssarizzi"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>  |                             <a href="#"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>                              |
|   Robert Marques    | Desenvolvedor |  <a href="https://github.com/Robert-gus"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>  |                             <a href="#"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>                              |
