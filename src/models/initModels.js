const Cart = require('./cart.model');
const Orders = require('./order.model');
const Products = require('./product.model');
const ProductInCart = require('./productInCart.model');
const ProductInOrder = require('./productInOrder.model');
const Users = require('./user.model');

const initModels = () => {
  // users - orders
  Users.hasMany(Orders, { foreignKey: 'user_id' });
  Orders.belongsTo(Users, { foreignKey: 'user_id' });

  //Users - cart
  Users.hasOne(Cart, { foreignKey: 'user_id' });
  Cart.belongsTo(Users, { foreignKey: 'user_id' });

  //Users - products
  Users.hasMany(Products, { foreignKey: 'user_id' });
  Products.belongsTo(Users, { foreignKey: 'user_id' });

  //Products - products_cart
  Products.hasMany(ProductInCart, { foreignKey: 'product_id' });
  ProductInCart.belongsTo(Products, { foreignKey: 'product_id' });

  //Products - products_order
  Products.hasMany(ProductInOrder, { foreignKey: 'product_id' });
  ProductInOrder.belongsTo(Products, { foreignKey: 'product_id' });

  //Cart - products_cart
  Cart.hasMany(ProductInCart, { foreignKey: 'cart_id', onDelete: 'cascade' });
  ProductInCart.belongsTo(Cart, { foreignKey: 'cart_id' });

  //Order - products_order
  Orders.hasMany(ProductInOrder, { foreignKey: 'order_id' });
  ProductInOrder.belongsTo(Orders, { foreignKey: 'order_id' });
};

module.exports = initModels;
