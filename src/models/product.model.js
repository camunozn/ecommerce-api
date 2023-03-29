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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Products;
