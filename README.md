# 🏢 API de Empresas e Produtos

API RESTful construída com **NestJS**, **Prisma** e **Mysql**, contendo rotas para gerenciamento de empresas e produtos vinculados.

---

## 🚀 Endpoints

### 🔹 Criar uma empresa

**POST** `/v1/companies`

  - Cria uma nova empresa.

**Requisição:**
```json
{
  "name": "adidas",
  "cnpj": "59546515000131"
}
```
Respostas possíveis:

- `201 Created`: empresa criada com sucesso.

- `409 Conflict`: CNPJ já cadastrado.

- `400 Bad Request`: campos inválidos ou ausentes.

### 🔹 Listar todas as empresas
**GET** `/v1/companies`

  - Retorna uma lista de todas as empresas cadastradas.

###🔹 Buscar empresa por ID
**GET** `/v1/companies/:id`

- Busca uma empresa pelo ID.

- :id: número inteiro válido.

Respostas:

- `200 OK`: empresa encontrada.

- `400 Bad Request`: ID inválido.

- `404 Not Found`: empresa não encontrada.

### 🔹 Buscar empresa por nome (filtro parcial)
**GET** `/v1/companies/search/:name`

Retorna empresas que contenham o nome fornecido.

### 🔹 Listar produtos de uma empresa
**GET** `/v1/companies/:id/products`

- Retorna todos os produtos da empresa com ID informado.

- Parâmetro opcional: ?name=produto para filtro por nome.

### 🔹 Atualizar empresa
**PATCH** `/v1/companies/:id`

- Atualiza parcialmente os dados de uma empresa.

Exemplo de body:

```json
{
  "name": "umbro"
}
```

Respostas:

- `200 OK`: empresa atualizada.

- `404 Not Found`: empresa não encontrada.

- `400 Bad Request`: dados inválidos.

### 🔹 Deletar empresa
**DELETE** /v1/companies/:id

- Remove uma empresa do sistema.

Atenção: só é possível deletar empresas sem produtos vinculados.

Respostas:

- `204 No Content`: empresa removida.

- `400 Bad Request`: empresa possui produtos vinculados.

- `404 Not Found`: empresa não encontrada.

## 👟 Produtos
### 🔹 Criar um produto
**POST** `/v1/products`

- Cria um novo produto vinculado a uma empresa.

Exemplo de body:
```json
{
  "name": "air jordan",
  "price": 455.99,
  "description": "Air force, Dunk, Air Max — A Tecnologia Que Você Precisa Para Melhorar Seus Resultados No Esporte. Compre Agora!",
  "companyId": 2
}
```
Respostas:

- `201 Created`: produto criado.

- `400 Bad Request`: dados inválidos ou empresa inexistente.

### 🔹 Listar todos os produtos
**GET** `/v1/products`

- Retorna todos os produtos cadastrados.

### 🔹 Buscar produto por ID
**GET** /v1/products/:id

- Retorna um produto pelo ID informado.

🔹 Atualizar produto
**PATCH** /v1/products/:id

- Atualiza os dados de um produto.

Exemplo de body:
```json
{
  "name": "air max"
}
```

### 🔹 Deletar produto
**DELETE** `/v1/products/:id`

- Remove um produto pelo ID.

## ✅ Validações
- IDs são validados e convertidos para número usando ParseIntPipe no controlador;
-  erros retornam 400 Bad Request.
-  Campos obrigatórios são validados via DTOs com class-validator.
-  CNPJ é único, e duplicatas retornam erro 409 Conflict.
-  Empresas com produtos vinculados não podem ser deletadas (400 Bad Request).

📦 Tecnologias utilizadas
- NestJS
- Prisma ORM
- MongoDB (via Prisma)
- class-validator
- TypeScript
