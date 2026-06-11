const Customer = require('../models/Customer');

exports.getAll = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      const err = new Error('Cliente não encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) {
      const err = new Error('Cliente não encontrado');
      err.status = 404;
      return next(err);
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      const err = new Error('Cliente não encontrado');
      err.status = 404;
      return next(err);
    }
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (err) {
    next(err);
  }
};