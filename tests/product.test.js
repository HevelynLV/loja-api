jest.mock('../src/models/Product');
jest.mock('../src/config/database', () => jest.fn());

const Product = require('../src/models/Product');
const productController = require('../src/controllers/productController');

const mockReq = (params = {}, body = {}) => ({ params, body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Product Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar lista de produtos', async () => {
    const produtos = [{ _id: '1', name: 'Camiseta', price: 49.90 }];
    Product.find.mockResolvedValue(produtos);

    const req = mockReq();
    const res = mockRes();

    await productController.getAll(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(produtos);
  });

  it('deve retornar um produto por ID', async () => {
    const produto = { _id: '1', name: 'Camiseta', price: 49.90 };
    Product.findById.mockResolvedValue(produto);

    const req = mockReq({ id: '1' });
    const res = mockRes();

    await productController.getById(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(produto);
  });

  it('deve retornar 404 quando produto não encontrado', async () => {
    Product.findById.mockResolvedValue(null);

    const req = mockReq({ id: '999' });
    const res = mockRes();

    await productController.getById(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

  it('deve criar um novo produto', async () => {
    const novoProduto = { name: 'Calça', price: 99.90, stock: 50, category: 'Roupas' };
    const produtoSalvo = { _id: '2', ...novoProduto };

    Product.prototype.save = jest.fn().mockResolvedValue(produtoSalvo);

    const req = mockReq({}, novoProduto);
    const res = mockRes();

    await productController.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('deve atualizar um produto', async () => {
    const produtoAtualizado = { _id: '1', name: 'Camiseta', price: 39.90 };
    Product.findByIdAndUpdate.mockResolvedValue(produtoAtualizado);

    const req = mockReq({ id: '1' }, { price: 39.90 });
    const res = mockRes();

    await productController.update(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(produtoAtualizado);
  });

  it('deve remover um produto', async () => {
    Product.findByIdAndDelete.mockResolvedValue({ _id: '1', name: 'Camiseta' });

    const req = mockReq({ id: '1' });
    const res = mockRes();

    await productController.remove(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ message: 'Produto removido com sucesso' });
  });


  it('deve chamar next quando getAll falhar', async () => {
    Product.find.mockRejectedValue(new Error('Erro no banco'));

    const req = mockReq();
    const res = mockRes();

    await productController.getAll(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('deve retornar 404 ao atualizar produto inexistente', async () => {
    Product.findByIdAndUpdate.mockResolvedValue(null);

    const req = mockReq({ id: '999' }, { price: 10 });
    const res = mockRes();

    await productController.update(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });

  it('deve retornar 404 ao remover produto inexistente', async () => {
    Product.findByIdAndDelete.mockResolvedValue(null);

    const req = mockReq({ id: '999' });
    const res = mockRes();

    await productController.remove(req, res, mockNext);

    expect(mockNext.mock.calls[0][0].status).toBe(404);
  });
});