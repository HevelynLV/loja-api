require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/database');

const app = express();

// Middleware para ler JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    message: 'Oi prof. O teste deu certo.'
});
});

// Importação das rotas
const productRoutes = require('./src/routes/productRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

// Rotas da API
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

// Middleware de tratamento de erros (sempre por último)
const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler);

// Inicia o servidor
if (process.env.NODE_ENV !== 'test') {
  connectDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
