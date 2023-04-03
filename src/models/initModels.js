const Cart = require('./cart.model');
const Orders = require('./order.model');
const Products = require('./product.model');
const ProductInCart = require('./productInCart.model');
const ProductInOrder = require('./productInOrder.model');
const Users = require('./user.model');

const initModels = () => {
  // users - orders
  Users.hasMany(Orders, { foreignKey: 'userId' });
  Orders.belongsTo(Users, { foreignKey: 'userId' });

  //Users - cart
  Users.hasOne(Cart, { foreignKey: 'userId' });
  Cart.belongsTo(Users, { foreignKey: 'userId' });

  //Users - products
  Users.hasMany(Products, { foreignKey: 'userId' });
  Products.belongsTo(Users, { foreignKey: 'userId' });

  //Products - products_cart
  Products.hasMany(ProductInCart, { foreignKey: 'productId' });
  ProductInCart.belongsTo(Products, { foreignKey: 'productId' });

  //Products - products_order
  Products.hasMany(ProductInOrder, { foreignKey: 'productId' });
  ProductInOrder.belongsTo(Products, { foreignKey: 'productId' });

  //Cart - products_cart
  Cart.hasMany(ProductInCart, { foreignKey: 'cartId' });
  ProductInCart.belongsTo(Cart, { foreignKey: 'cartId' });

  //Order - products_order
  Orders.hasMany(ProductInOrder, { foreignKey: 'orderId' });
  ProductInOrder.belongsTo(Orders, { foreignKey: 'orderId' });
};

module.exports = initModels;
