const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "User_role",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      role_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "users_roles",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "user_id_fk_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "role_id_fk_idx",
          using: "BTREE",
          fields: [{ name: "role_id" }],
        },
      ],
    }
  );
};
