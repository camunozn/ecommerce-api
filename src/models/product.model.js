const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Products = db.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.ENUM('InStock', 'OutOfStock'),
    allowNull: false,
    defaultValue: 'InStock',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  productImage: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'product_image',
  },
});

module.exports = Products;
