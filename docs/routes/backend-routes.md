## Funções/Módulos que o backend deve realizar:

-> Autenticação (Auth)  
-> Registro de usuários (Users)  
-> Criação de categorias - padrões do sistema e do usuário (Categories)  
-> Criação de transações pelo usuário - despesas ou receitas (Transactions)

### Rotas:

- /auth

  - /login | POST | autenticar | usuário Aberta

- /users

  - / | POST | criar usuário | Aberta
  - /me | PATCH | atualizar usuário | Fechada (JWT)
  - /me | DELETE | apagar usuário | Fechada (JWT)
  - /me | GET | Exibir dados do usuário | Fechada (JWT)
  - /me/password | PATCH | atualizar senha | Fechada (JWT)

- /categories

  - / | GET | exibir todas as categorias | Fechada (JWT)
  - / | POST | criar categoria | Fechada (JWT)
  - /:id | PATCH | editar categoria | Fechada (JWT)
  - /:id | DELETE | apagar categoria | Fechada (JWT)

- /transactions

  - /?month=MM&year=YYYY&limit=offset= | GET | exibir transações de acordo com mês e ano | Fechada (JWT)
  - /comparison/?type=&month=MM&year=YYYY (type = montlhy/yearly) | GET | exibir comparação de acordo com o mês anterior | Fechada (JWT)
  - /balance | GET | exibir saldo do usuário (lucro ou prejuízo) | Fechada (JWT)
  - / | POST | criar transações (receita/despesa) | Fechada (JWT)
  - /:id | PATCH | editar transação (receita/despesa) | Fechada (JWT)
  - /:id | DELETE | deletar transação (receita/despesa) | Fechada (JWT)
