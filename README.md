# 🛍️ Loja API

API RESTful para gerenciamento de uma loja, desenvolvida com Node.js, Express e MongoDB.

## Sobre o Projeto

Este projeto foi desenvolvido como trabalho da disciplina de **Programação Server-Side**, com o objetivo de construir uma API RESTful completa com operações de CRUD para três entidades: Produtos, Clientes e Pedidos.

---

## Tecnologias Utilizadas

- **Node.js** — ambiente de execução JavaScript
- **Express** — framework para criação da API
- **MongoDB** — banco de dados NoSQL
- **Mongoose** — ODM para modelagem dos dados
- **dotenv** — gerenciamento de variáveis de ambiente
- **Jest** — testes unitários e relatório de cobertura
- **ESLint** — análise estática de código
- **Nodemon** — reinicialização automática em desenvolvimento

---

## 📁 Estrutura do Projeto

```
loja-api/
├── src/
│   ├── config/
│   │   └── database.js        # Conexão com o MongoDB
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── customerController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── customerRoutes.js
│   │   └── orderRoutes.js
│   └── middlewares/
│       └── errorHandler.js    # Tratamento centralizado de erros
├── tests/                     # Testes unitários com Jest
├── .env.example               # Exemplo de variáveis de ambiente
├── .gitignore
├── eslint.config.mjs
├── package.json
└── server.js                  # Entrada da aplicação
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) ou MongoDB local

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/HevelynLV/loja-api.git
cd loja-api
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
# Crie o arquivo .env baseado no .env.example
cp .env.example .env
```

Edite o `.env` com suas credenciais:
```
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/loja
PORT=3000
```

**4. Rode o servidor em desenvolvimento**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

---

## 📌 Endpoints

### 🛒 Produtos `/products`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/products` | Lista todos os produtos |
| GET | `/products/:id` | Busca produto por ID |
| POST | `/products` | Cria um novo produto |
| PUT | `/products/:id` | Atualiza um produto |
| DELETE | `/products/:id` | Remove um produto |

**Exemplo de body (POST/PUT):**
```json
{
  "name": "Camiseta",
  "price": 49.90,
  "stock": 100,
  "category": "Roupas"
}
```

---

### 👤 Clientes `/customers`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/customers` | Lista todos os clientes |
| GET | `/customers/:id` | Busca cliente por ID |
| POST | `/customers` | Cria um novo cliente |
| PUT | `/customers/:id` | Atualiza um cliente |
| DELETE | `/customers/:id` | Remove um cliente |

**Exemplo de body (POST/PUT):**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456",
  "phone": "47999998888"
}
```

---

### 📦 Pedidos `/orders`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/orders` | Lista todos os pedidos |
| GET | `/orders/:id` | Busca pedido por ID |
| POST | `/orders` | Cria um novo pedido |
| PUT | `/orders/:id` | Atualiza um pedido |
| DELETE | `/orders/:id` | Remove um pedido |

**Exemplo de body (POST/PUT):**
```json
{
  "customerId": "ID_DO_CLIENTE",
  "items": [
    {
      "productId": "ID_DO_PRODUTO",
      "quantity": 2,
      "size": "M"
    }
  ],
  "total": 99.80,
  "address": "Rua das Flores, 123"
}
```

**Status disponíveis:** `pendente` | `enviado` | `entregue` | `cancelado`

---

## 🧪 Testes

```bash
# Rodar testes com relatório de cobertura
npm test
```

O relatório de cobertura será gerado na pasta `coverage/`.

---

## 🔍 Lint

```bash
# Verificar erros de código
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

---

## 👥 Integrantes do Grupo

- Nome 1
- Nome 2
- Nome 3
- Nome 4
- Nome 5

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
