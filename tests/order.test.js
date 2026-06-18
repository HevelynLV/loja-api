jest.mock('../src/models/order');
jest.mock('../src/config/database', () => jest.fn());

const Order = require('../src/models/order');
const orderController = require('../src/controllers/orderController');

const mockReq = (params = {}, body = {}) => ({ params, body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Order Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar lista de pedidos', async () => {
    const pedidos = [{ _id: '1', total: 99.90, status: 'pendente' }];
    Order.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(pedidos)
      })
    });

    const req = mockReq();
    const res = mockRes();

    await orderController.getAll(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(pedidos);
  });

  it('deve retornar um pedido por ID', async () => {
    const pedido = { _id: '1', total: 99.90, status: 'pendente' };
    Order.findById.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(pedido)
      })
    });

    const req = mockReq({ id: '1' });
    const res = mockRes();

    await orderController.getById(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(pedido);
  });

  it('deve retornar 404 quando pedido não encontrado', async () => {
    Order.findById.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      })
    });

    const req = mockReq({ id: '999' });
    const res = mockRes();

    await orderController.getById(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

  it('deve criar um novo pedido', async () => {
    const novoPedido = {
      customerId: 'cliente1',
      items: [{ productId: 'produto1', quantity: 2, size: 'M' }],
      total: 99.80,
      address: 'Rua das Flores, 123'
    };

    Order.prototype.save = jest.fn().mockResolvedValue({ _id: '2', ...novoPedido });

    const req = mockReq({}, novoPedido);
    const res = mockRes();

    await orderController.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('deve atualizar um pedido', async () => {
    const pedidoAtualizado = { _id: '1', status: 'enviado' };
    Order.findByIdAndUpdate.mockResolvedValue(pedidoAtualizado);

    const req = mockReq({ id: '1' }, { status: 'enviado' });
    const res = mockRes();

    await orderController.update(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(pedidoAtualizado);
  });

  it('deve remover um pedido', async () => {
    Order.findByIdAndDelete.mockResolvedValue({ _id: '1' });

    const req = mockReq({ id: '1' });
    const res = mockRes();

    await orderController.remove(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ message: 'Pedido removido com sucesso' });
  });

  it('deve chamar next quando getAll falhar', async () => {
    Order.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('Erro no banco'))
      })
    });

    const req = mockReq();
    const res = mockRes();

    await orderController.getAll(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('deve retornar 404 ao atualizar pedido inexistente', async () => {
    Order.findByIdAndUpdate.mockResolvedValue(null);

    const req = mockReq({ id: '999' }, { status: 'enviado' });
    const res = mockRes();

    await orderController.update(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

  it('deve retornar 404 ao remover pedido inexistente', async () => {
    Order.findByIdAndDelete.mockResolvedValue(null);

    const req = mockReq({ id: '999' });
    const res = mockRes();

    await orderController.remove(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

});