jest.mock('../src/models/Customer');
jest.mock('../src/config/database', () => jest.fn());

const Customer = require('../src/models/Customer');
const customerController = require('../src/controllers/customerController');

const mockReq = (params = {}, body = {}) => ({ params, body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Customer Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar lista de clientes', async () => {
    const clientes = [{ _id: '1', name: 'Maria', email: 'maria@email.com' }];
    Customer.find.mockResolvedValue(clientes);

    const req = mockReq();
    const res = mockRes();

    await customerController.getAll(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(clientes);
  });

  it('deve retornar um cliente por ID', async () => {
    const cliente = { _id: '1', name: 'Maria', email: 'maria@email.com' };
    Customer.findById.mockResolvedValue(cliente);

    const req = mockReq({ id: '1' });
    const res = mockRes();

    await customerController.getById(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(cliente);
  });

  it('deve retornar 404 quando cliente não encontrado', async () => {
    Customer.findById.mockResolvedValue(null);

    const req = mockReq({ id: '999' });
    const res = mockRes();

    await customerController.getById(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

  it('deve criar um novo cliente', async () => {
    const novoCliente = { name: 'João', email: 'joao@email.com', password: '123456', phone: '47999998888' };

    Customer.prototype.save = jest.fn().mockResolvedValue({ _id: '2', ...novoCliente });

    const req = mockReq({}, novoCliente);
    const res = mockRes();

    await customerController.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('deve atualizar um cliente', async () => {
    const clienteAtualizado = { _id: '1', name: 'Maria', email: 'novo@email.com' };
    Customer.findByIdAndUpdate.mockResolvedValue(clienteAtualizado);

    const req = mockReq({ id: '1' }, { email: 'novo@email.com' });
    const res = mockRes();

    await customerController.update(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(clienteAtualizado);
  });

  it('deve remover um cliente', async () => {
    Customer.findByIdAndDelete.mockResolvedValue({ _id: '1', name: 'Maria' });

    const req = mockReq({ id: '1' });
    const res = mockRes();

    await customerController.remove(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ message: 'Cliente removido com sucesso' });
  });

  it('deve chamar next quando getAll falhar', async () => {
    Customer.find.mockRejectedValue(new Error('Erro no banco'));

    const req = mockReq();
    const res = mockRes();

    await customerController.getAll(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('deve retornar 404 ao atualizar cliente inexistente', async () => {
    Customer.findByIdAndUpdate.mockResolvedValue(null);

    const req = mockReq({ id: '999' }, { email: 'x@x.com' });
    const res = mockRes();

    await customerController.update(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

  it('deve retornar 404 ao remover cliente inexistente', async () => {
    Customer.findByIdAndDelete.mockResolvedValue(null);

    const req = mockReq({ id: '999' });
    const res = mockRes();

    await customerController.remove(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

});