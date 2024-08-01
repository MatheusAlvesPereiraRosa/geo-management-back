const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coordinatesX: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coordinatesY: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;