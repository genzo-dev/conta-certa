# Requisitos não funcionais

## RNF001 — Linguagem e Framework

O backend deve ser desenvolvido em TypeScript usando NestJS. O frontend deve ser desenvolvido em Next.js com TailwindCSS.

## RNF002 — Banco de Dados

O sistema deve usar PostgreSQL como banco relacional, acessado via TypeORM.

## RNF003 — Segurança

As senhas devem ser criptografadas com bcrypt. A autenticação deve usar JWT, e as rotas protegidas devem validar o token antes do acesso.

## RNF004 — Desempenho

O sistema deve responder em até 2 segundos para operações comuns. Consultas ao banco devem usar paginação em listagens grandes, evitando sobrecarga e otimizando desempenho.

## RNF005 — Escalabilidade

O sistema deve ser compatível com execução em containers Docker, permitindo futura escalabilidade horizontal, se necessário.

## RNF006 — Manutenibilidade

O sistema será monolítico, mas deve seguir uma arquitetura modular dentro do NestJS, separando responsabilidades (usuários, transações, categorias, etc).

## RNF007 — Usabilidade

A interface deve ser intuitiva, responsiva e acessível, funcionando bem em desktop e mobile.

## RNF008 — Execução Local e Versionamento

O sistema será executado em ambiente local com suporte a Docker. O código será disponibilizado no GitHub como portfólio.

## RNF009 — Logs e Monitoramento

O backend deve registrar logs de erros e requisições e possuir um sistema básico de monitoramento (ex: Health Check).

## RNF010 — Testes

O sistema deve incluir testes unitários e de integração futuramente, para garantir estabilidade do código.
