#  Sistema de Cadastro e Login - ABRIGO DE ANIMAIS

Este projeto é um sistema completo de cadastro e login de usuários, desenvolvido com **Node.js**, **Express**, **TypeORM** e **MySQL**, com uma interface simples em HTML, JavaScript e TypeScript.

##  Funcionalidades

- Cadastro de usuários com validação de senhas
- Login com verificação de hash via **bcrypt**
- Conexão com banco MySQL
- CRUD completo de usuários e pets
- Estrutura modular com Model, Controller, Repository e Rotas

##  Tecnologias Utilizadas

- Node.js
- Express
- TypeORM
- MySQL
- bcryptjs
- HTML/CSS/JS puro (sem frameworks no frontend)

---

##  Estrutura do Projeto

 src/
├── controller/
│ └── UserController.ts
├── database/
│ └── dataSource.ts
├── model/
│ └── User.ts
├── repository/
│ └── UserRepositories.ts
├── routes/
│ └── UserRoutes.ts
├── view/
│ ├── cadastrar.html
│ ├── login.html
│ └── js/
│ ├── cadastro.js
│ └── login.js
└── server.ts


---

## ⚙️ Configuração do Banco de Dados

> Banco MySQL chamado `usuariospetshop`

**Tabela criada automaticamente** com:

```ts
synchronize: true
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'usuariospetshop',
  synchronize: true,
  entities: [__dirname + '/../model/*.ts'],
});

```
---

## Frontend
cadastrar.html
Formulário de cadastro com:

Nome

E-mail

Senha (mínimo 8 caracteres)

Confirmação de senha

login.html
Formulário de login com:

E-mail

Senha.

## tabela de rout dos usuarios

| Método | Rota                   | Descrição                 |
|--------|------------------------|---------------------------|
| POST   | `/api/usuarios`        | Cria um novo usuário      |
| POST   | `/api/usuarios/login`  | Autentica um usuário      |
| GET    | `/api/usuarios/:id`    | Retorna usuário por ID    |
| GET    | `/api/usuarios`        | Lista todos os usuários   |
| PUT    | `/api/usuarios/:id`    | Atualiza dados do usuário |
| DELETE | `/api/usuarios/:id`    | Remove um usuário         |

## tabela de rout dos pets

| Método | Rota              | Descrição                         |
|--------|-------------------|-----------------------------------|
| POST   | `/api/pets`       | Cadastra um novo pet              |
| GET    | `/api/pets`       | Lista todos os pets               |
| GET    | `/api/pets/:id`   | Retorna um pet pelo ID            |
| PUT    | `/api/pets/:id`   | Atualiza os dados de um pet       |
| DELETE | `/api/pets/:id`   | Remove um pet do sistema          |



