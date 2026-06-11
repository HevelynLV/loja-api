const Order = require('../models/Order');

exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('items.productId', 'name price');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name email')
      .populate('items.productId', 'name price');
    if (!order) {
      const err = new Error('Pedido não encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!order) {
      const err = new Error('Pedido não encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      const err = new Error('Pedido não encontrado');
      err.status = 404;
      return next(err);
    }
    res.json({ message: 'Pedido removido com sucesso' });
  } catch (err) {
    next(err);
  }
};