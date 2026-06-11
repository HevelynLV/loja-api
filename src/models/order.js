const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Cliente é obrigatório'],
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Produto é obrigatório'],
        },
        quantity: {
          type: Number,
          required: [true, 'Quantidade é obrigatória'],
          min: [1, 'Quantidade mínima é 1'],
        },
        size: {
          type: String,
          trim: true,
        },
      },
    ],
    total: {
      type: Number,
      required: [true, 'Total é obrigatório'],
      min: [0, 'Total não pode ser negativo'],
    },
    status: {
      type: String,
      enum: ['pendente', 'enviado', 'entregue', 'cancelado'],
      default: 'pendente',
    },
    address: {
      type: String,
      required: [true, 'Endereço é obrigatório'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);