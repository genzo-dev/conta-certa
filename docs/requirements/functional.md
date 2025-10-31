# Requisitos Funcionais

## RF001 - Cadastro de Usuário

O sistema deve permitir o cadastro de um novo usuário informando nome, e-mail e senha. O e-mail deve ser único, e a senha deve ser armazenada de forma criptograda.

## RF002 - Login de Usuário

O sistema deve permitir o login via e-mail e senha. Após autenticação bem-sucedida, o sistema deve gerar um token JWT para controle de sessão.

## RF003 - Redefinição de Senha

O sistema deve permitir que o usuário redefina sua senha informando seu e-mail e uma nova senha.

## RF004 - Visualização de Perfil

O sistema deve permitir ao usuário visualizar suas próprias informações pessoais (nome e e-mail).

## RF005 - Edição de Perfil

O usuário deve poder alterar o seu nome e senha. O e-mail não pode ser alterado.

## RF006 - Cadastro de Categorias

O sistema deve permitir criar novas categorias de transação. Cada categorias deve conter nome, ícone, cor e tipo (receita ou despesa).

## RF007 - Categorias Padrão

O sistema deve disponibilizar categorias padrão (como alimentação, transporte, lazer, etc.), que não podem ser modificadas ou removidas. O usuário poderá criar novas categorias personalizadas conforme sua necessidade.

## RF008 - Cadastro de Transações

O sistema deve permitir o registro de transações financeiras. Cada transação deve conter: Tipo (receita ou despesa) - Valor - Data - Categoria - Descrição opcional. As transações devem ser associadas a um usuário autenticado.

## RF009 - Edição e Exclusão de Transações

O usuário deve poder editar ou excluir suas próprias transações.

## RF010 - Listagem de Transações

O sistema deve listar todas as transações do usuário, permitindo filtragem por mês, categoria e tipo (receita/despesa).

## RF011 - Dashboard Financeiro

O sistema deve apresentar um painel visual com resumos financeiros, incluindo Saldo atual - Total de receitas e despesas do mês - Gráficos de evolução e distribuição

## RF012 - Relatórios FInanceiros

O sistema deve gerar relatórios mensais sob solicitação do usuário, apresentando totais por categoria e tipo de transação.

## RF013 - Notificações do Sistema

O sistema deve exibir notificações visuais (por exemplo Toastify) para ações do usuário, como criação, edição ou exclusão de transações.
