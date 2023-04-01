const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Cart = db.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'user_id',
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    field: 'total_amount',
  },
});

module.exports = Cart;
