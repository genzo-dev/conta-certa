# Conta Certa

## Sobre o projeto:

O **Conta Certa** é um projeto criado com o objetivo de auxiliar no gerenciamento financeiro dos seus usuários. O método é simples: o usuário cadastra suas transações (receitas ou despesas) juntamente com a categoria relacionada a elas (alimentação, transporte, entre outras) e o sistema mostra como essas transações estão sendo distribuídas, reunindo tudo em um único lugar e exibindo o saldo atual, total de receitas e despesas do mês, além de gráficos que demonstram sua evolução.

O objetivo é oferecer ao usuário uma **visão clara e objetiva** de seus gastos, ajudando-o a compreender melhor seus hábitos financeiros e tomar decisões mais conscientes.

## Tecnologias principais:

- **Next.js** - Frontend
- **NestJS** - Backend
- **PostgreSQL + TypeORM** - Banco de dados
- **Docker** - Infraestrutura (inicialmente apenas para o banco de dados)

## 🚀 Como rodar o projeto

> [!IMPORTANT]
>
> Requisitos:
>
> - Node.js 20.x (LTS recomendado)
> - NestJS 11.x
> - Docker
> - Docker Compose

### BACKEND

#### 1. Acesse a pasta `/backend/`:

```bash
cd backend
```

#### 2. Copie as variáveis de ambiente e rode o banco:

```bash
cp .env-example .env
```

Exitem duas formas de rodar o banco:

```bash
npm run dev:db # banco no docker em modo detach (-d - sem logs do docker)
```

OU

```bash
npm run log:dev:db # banco no docker em modo build (--build - com logs do docker)
```

#### 3. Rode o backend:

```bash
npm install
npm run start:dev
```

#### 4. Rotas do backend:

Documentação de API (Swagger):

```bash
http://localhost:3001/docs/
```

### FRONTEND

#### 1. Acesse a pasta `frontend` e rode:

```bash
cd frontend
npm install
npm run dev
```

#### 2. Rotas do frontend:

Tela de login

```bash
http://localhost:3000/login
```

Tela de register

```bash
http://localhost:3000/register
```

Tela de dashboard (autenticada)

```bash
http://localhost:3000/
```

> Obs.: Existem outras rotas já configuradas, mas as páginas não foram implementadas.

## ⚙️ Como rodar os testes

### Testes unitários backend

#### 1. Acesse a pasta `backend` e rode:

```bash
cd backend
npm run test # roda os testes unitários uma única vez
```

OU

```bash
cd backend
npm run test:watch # roda os testes unitários com --watch (rodaram sempre que atualizar algum arquivo de teste unitário)
```

### Testes e2e e integração backend

#### 1. Acesse a pasta `/backend/` e copie as variáveis de ambiente (`/backend/.env`):

```bash
cd backend
cp .env.test-example .env.test
```

#### 2. Rode o banco dos testes em memória:

```bash
npm run test:db
```

#### 3. Rode os testes e2e e integração em outro terminal dentro da pasta `/backend/`:

```bash
cd backend
npm run test:e2e
```

### Testes unitários frontend

#### 1. Acesse a pasta `/frontend/` e rode:

```bash
cd frontend
npm run test
```

> Obs.: Os testes unitários no frontend foram feitos com o Vitest

### Testes e2e frontend (ciclo completo)

> [!WARNING]
>
> Os testes e2e no frontend são feitos com Cypress
> Para rodar eles é necessário que o sistema inteiro esteja rodando

#### 1. Acesse a pasta `/backend/` e rode:

```bash
cd backend
npm run test:db
```

Agora o banco de testes está rodando.

#### 2. Em outro terminal acesse a pasta `/backend/` e rode:

```bash
cd backend
npm run test:e2e:full
```

Uma aplicação NestJS começará a rodar em modo dev conectada ao banco de testes

#### 3. Abra mais um terminal, acesse a pasta `frontend` e rode:

```bash
cd frontend
npm run dev
```

#### 4. Por fim, em mais um terminal, acesse a pasta `frontend` e rode:

```bash
cd frontend
npm run cy:open # roda testes e2e e demonstra eles visualmente em uma nova janela
```

OU

```bash
cd frontend
npm run cy:run # roda testes e2e no terminal
```

> [!WARNING]
>
> Recomenda-se a utilização do `npm run cy:open` para melhor visualzição e confiabilidade dos testes.

### Tecnologias e ferramentas utilizadas:

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs)
![NestJS](https://img.shields.io/badge/NestJS-e0234e?logo=nestjs&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=fff)
![Docker](https://img.shields.io/badge/Docker-2496ed?logo=docker&logoColor=fff)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=000)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)
![Vitest](https://img.shields.io/badge/Vitest-646cff?logo=vitest&logoColor=fff)
![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=fff)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?logo=insomnia&logoColor=fff)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)
