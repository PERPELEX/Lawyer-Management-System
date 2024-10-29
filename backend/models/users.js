const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      tenant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "tenant",
          key: "id",
        },
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: "username_UNIQUE",
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "username_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }],
        },
        {
          name: "tenant_id",
          using: "BTREE",
          fields: [{ name: "tenant_id" }],
        },
      ],
    }
  );
};
