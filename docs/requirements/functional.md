# Requisitos Funcionais

## RF001 - Cadastro de Usuário

O sistema deve permitir o cadastro de um novo usuário informando nome, e-mail e senha. O e-mail deve ser único, e a senha deve ser armazenada de forma criptografada.

**Critérios de aceitação:**

- Não deve permitir o cadastro de e-mails duplicados;
- A senha deve ter no mínimo 8 caracteres;
- Ao cadastrar com sucesso, o sistema deve exibir uma notificação de sucesso.

## RF002 - Login de Usuário

O sistema deve permitir o login via e-mail e senha. Após autenticação bem-sucedida, o sistema deve gerar um token JWT para controle de sessão.

**Critérios de aceitação:**

- O sistema deve recusar logins com e-mail inexistente;
- O sistema deve recusar logins com senha incorreta;
- Após login bem-sucedido, deve gerar um token JWT válido por 60 minutos.

## RF003 - Redefinição de Senha

O sistema deve permitir que o usuário redefina sua senha informando seu e-mail e uma nova senha.

## RF004 - Visualização de Perfil

O sistema deve permitir ao usuário visualizar suas próprias informações pessoais (nome e e-mail).

## RF005 - Edição de Perfil

O usuário deve poder alterar o seu nome e senha. O e-mail não pode ser alterado.

## RF006 - Cadastro de Categorias

O sistema deve permitir criar novas categorias de transação. Cada categoria deve conter nome, ícone, cor e tipo (receita ou despesa).

## RF007 - Categorias Padrão

O sistema deve disponibilizar categorias padrão (como alimentação, transporte, lazer, etc.), que não podem ser modificadas ou removidas. O usuário poderá criar novas categorias personalizadas conforme sua necessidade.

## RF008 - Cadastro de Transações

O sistema deve permitir o registro de transações financeiras. Cada transação deve conter:

- Tipo (receita ou despesa);
- Valor;
- Data;
- Categoria;
- Descrição opcional.

**Critérios de aceitação:**

- O sistema deve validar que o valor é numérico e positivo;
- O campo “Tipo” deve aceitar apenas “receita” ou “despesa”.

As transações devem ser associadas a um usuário autenticado.

## RF009 - Edição e Exclusão de Transações

O usuário deve poder editar ou excluir suas próprias transações.

## RF010 - Listagem de Transações

O sistema deve listar todas as transações do usuário, permitindo filtragem por mês, categoria e tipo (receita/despesa).

## RF011 - Dashboard Financeiro

O sistema deve apresentar um painel visual com resumos financeiros, incluindo:

- Saldo atual;
- Total de receitas e despesas do mês;
- Gráficos de evolução e distribuição.

## RF012 - Relatórios Financeiros

O sistema deve gerar relatórios mensais sob solicitação do usuário, apresentando totais por categoria e tipo de transação.

## RF013 - Notificações do Sistema

O sistema deve exibir notificações visuais (por exemplo Toastify) para ações do usuário, como criação, edição ou exclusão de transações.
