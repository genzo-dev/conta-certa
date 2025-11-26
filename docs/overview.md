# Visão Geral

# 1. Introdução

## 1.1 Objetivo

O objetivo desse documento é apresentar de forma clara o que faz, qual intuito e qual problema resolve o sistema **Conta Certa**, além de demonstrar uma visão prática de seu funcionamento com relação aos seus usuários.

Este documento poderá sofrer alterações conforme o desenvolvimento do projeto, levando em consideração as possíveis mudanças do mesmo.

## 1.2 Escopo do Sistema

O **Conta Certa** é uma aplicação FullStack que busca auxiliar o gerenciamento financeiro pessoal. O sistema permite que o usuário registre e acompanhe suas receitas e despesas, categorizando-as de forma organizada e visualizando relatórios e gráficos que auxiliam no controle do orçamento. O foco é fornecer uma experiência simples, intuitiva e acessível, promovendo o controle financeiro de forma clara e objetiva.

## 1.3 Referências

- Documentação geral do projeto: [https://www.notion.so/Conta-Certa-Documenta-o-2a3bc7f8170180149c9ff53d248dade1?source=copy_link](https://www.notion.so/Conta-Certa-Documenta-o-2a3bc7f8170180149c9ff53d248dade1?pvs=21)
- Repositório no GitHub: https://github.com/genzo-dev/conta-certa

# 2. Descrição do Produto

O sistema se resume a uma prática de gerenciamento financeiro pessoal, o qual irá funcionar unicamente no lado do usuário, sem possuir um lado administrativo. O usuário poderá informar novas transações para o sistema, as quais poderão ser de receita ou despesa e irão conter alguma categoria (ex.: alimentação, transporte, viagem, contas, etc.) que possam informar para onde está indo seu dinheiro. Além disso, será mostrado para ele, por meio da tela principal, um gráfico que irá trazer um ímpar visual projetando seus gastos.

## 2.1 Perspectiva do Produto

O **Conta Certa** é uma aplicação web composta por:

- Frontend: desenvolvido em Next.js, responsável pela interface e experiência do usuário;
- Backend**:** construído em NestJS, responsável pelas regras de negócio e integrações;
- Banco de Dados**:** baseado em PostgreSQL utilizando o TypeORM para mapeamento e persistência;
- Infraestrutura**:** suportada por Docker, permitindo execução local e futura escalabilidade. A princípio será utilizado somente para o banco de dados, com possibilidade de expandir futuramente.

O sistema será documentado com Swagger, testado com Jest, e também terá apoio do Insomnia para validação de rotas e endpoints durante o desenvolvimento.

## 2.2 Funcionalidades principais

- Cadastro e autenticação de usuários com segurança (JWT e bcrypt);
- Gerenciamento de categorias (padrão e personalizadas);
- Registro de transações (receitas e despesas);
- Dashboard financeiro com gráficos e resumos;
- Relatórios mensais detalhados;
- Edição e exclusão de transações e categorias;
- Notificações e feedback visual ao usuário.

## 2.3 Público-Alvo

O **Conta Certa** é voltado para usuários que desejam gerenciar suas finanças pessoais, especialmente jovens adultos e profissionais que buscam visualizar de forma clara seus gastos e receitas sem depender de planilhas manuais.

# 3. Requisitos de Alto Nível

| Categoria            | Descrição                                                        |
| -------------------- | ---------------------------------------------------------------- |
| **Usabilidade**      | Interface moderna, responsiva e intuitiva (TailwindCSS e Figma). |
| **Segurança**        | Autenticação JWT, criptografia de senhas e rotas protegidas.     |
| **Desempenho**       | Respostas em até 2 segundos para operações comuns.               |
| **Escalabilidade**   | Compatível com containers Docker.                                |
| **Manutenibilidade** | Estrutura modular e organizada no NestJS.                        |
| **Testes**           | Utilização de Jest (backend) e Cypress (frontend).               |

# 4. Restrições e Dependências

- O sistema será executado em ambiente local com Docker, inicialmente somente para banco de dados;
- Depende de conexão com o banco de dados PostgreSQL;
- O e-mail do usuário deve ser único;
- O projeto está em fase de desenvolvimento e pode sofrer ajustes de escopo.

# 5. Entregáveis

- Aplicação web funcional (frontend e backend integrados);
- Documentação técnica (Swagger);
- Documentação de apoio no Notion e `/docs` no GitHub;
- Design no Figma;
- Testes automatizados básicos.

# 6. Considerações Finais

O **Conta Certa** é um projeto de caráter acadêmico e prático, com foco em demonstrar competências de desenvolvimento FullStack, boas práticas de arquitetura e documentação, além de entregar uma ferramenta útil e escalável para controle financeiro pessoal.
