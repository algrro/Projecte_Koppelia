const sq = require("../Config")
const { DataTypes } = require("sequelize")
const Price = sq.define("price", {
    id_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        primaryKey: false,
    },
    disc_2: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
    },
    disc_3: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
    },
    disc_4: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
    },
    disc_5: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
    }
}, {
        tableName: 'price',
        timestamps: false
    }
)

module.exports = Price
