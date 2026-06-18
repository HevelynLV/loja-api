require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const app = express();

app.use(express.json());

const productRoutes = require('./src/routes/productRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler);

// só conecta e sobe o servidor se não estiver em teste
if (process.env.NODE_ENV !== 'test') {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;