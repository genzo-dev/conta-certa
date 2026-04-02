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

### 1. Configure as variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
cp .env-example .env
```

### 2. Suba o banco de dados com Docker

```bash
  docker compose up -d # sem logs
```

OU

```bash
  docker compose up --build # com logs do container OU ao alterar algo no docker
```

Isso irá iniciar apenas o serviço de banco de dados.

### 3. Rodar o backend

```bash
cd backend
cp .env-example .env
npm install
npm run start
```

A documentação da API estará disponível em:

```
http://localhost:[porta]/docs
```

### 4. Rodar o frontend

```bash
  cd frontend
  npm install
  npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000/
```

> [!NOTE]
>
> O banco de dados roda somente no Docker.
> O backend depende do banco de dados estar em execução.
> O frontend depende do backend estar rodando.

### Tecnologias e ferramentas utilizadas:

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs)
![NestJS](https://img.shields.io/badge/NestJS-e0234e?logo=nestjs&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=fff)
![Docker](https://img.shields.io/badge/Docker-2496ed?logo=docker&logoColor=fff)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=000)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?logo=insomnia&logoColor=fff)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)
