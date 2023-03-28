const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../utils/database');

const Users = db.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  },
  {
    hooks: {
      beforeCreate: async user => {
        try {
          const salt = await bcrypt.genSalt(12);
          const passwordHash = await bcrypt.hash(user.password, salt);
          user.password = passwordHash;
        } catch (error) {
          throw error;
        }
      },
    },
  }
);

module.exports = Users;
