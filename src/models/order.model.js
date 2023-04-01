const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Order = db.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'total_amount',
  },
});

module.exports = Order;
