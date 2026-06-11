require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');

const app = express();

connectDB();

app.use(express.json());

const productRoutes = require('./src/routes/productRoutes');
app.use('/products', productRoutes);

const customerRoutes = require('./src/routes/customerRoutes');
app.use('/customers', customerRoutes);

const orderRoutes = require('./src/routes/orderRoutes');
app.use('/orders', orderRoutes);

const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


module.exports = app;