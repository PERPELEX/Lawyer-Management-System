const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Court",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      division: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      tehsil: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "courts",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
