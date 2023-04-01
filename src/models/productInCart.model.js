const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const ProductInCart = db.define('cart_products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cart_id',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('InStock', 'OutOfStock'),
    allowNull: false,
  },
});

module.exports = ProductInCart;
