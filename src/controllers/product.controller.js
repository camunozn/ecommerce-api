const ProductServices = require('../services/product.services');

exports.getAllProducts = async (req, res, next) => {
  try {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const { offset, limit } = req.query;

    const products = await ProductServices.getAll(offset, limit);
    const { count, rows } = products;

    const newOffset = isNext => {
      if (isNext) return Number(offset) + Number(limit);
      return Number(offset) - Number(limit);
    };

    const nextPage =
      newOffset(true) >= count
        ? null
        : `${url}?offset=${newOffset(true)}&limit=${limit}`;

    const previousPage =
      Number(offset) > 0
        ? `${url}?offset=${newOffset(false)}&limit=${limit}`
        : null;

    const response = {
      count,
      next: nextPage,
      previous: previousPage,
      products: rows,
    };

    const result = limit && offset ? response : response.products;
    res.json({
      status: 'success',
      data: {
        products: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (id !== req.body.user_id) {
      return next({
        status: 401,
        message: 'User not logged in',
        errorName: 'Unauthorized',
      });
    }
    const product = await ProductServices.createOne(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = await ProductServices.getOne(id);

    if (user_id !== req.user.id) {
      return next({
        status: 401,
        message: 'User not logged in.',
        errorName: 'Unauthorized',
      });
    }

    const updatedProduct = await ProductServices.updateOne(req.body, id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
