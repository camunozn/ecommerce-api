const Users = require('./user.models');
const Products = require('./product.models');
const ProductInOrder = require('./productInOrder.models');
const ProductInCart = require('./productInCart.models');
const Order = require('./order.models');
const Cart = require('./cart.models');

const initModels = () => {
  // users - orders
  Users.hasMany(Order, { foreignKey: 'user_id' });
  Order.belongsTo(Users, { foreignKey: 'user_id' });

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
  Order.hasMany(ProductInOrder, { foreignKey: 'order_id' });
  ProductInOrder.belongsTo(Order, { foreignKey: 'order_id' });
};

module.exports = initModels;
