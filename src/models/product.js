const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Preço é obrigatório'],
      min: [0, 'Preço não pode ser negativo'],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Estoque não pode ser negativo'],
    },
    category: {
      type: String,
      required: [true, 'Categoria é obrigatória'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);