const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "RoleResource",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      resource_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "resources",
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
      can_add: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      can_edit: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      can_view: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      can_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "roles_resources",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "resource_id",
          using: "BTREE",
          fields: [{ name: "resource_id" }],
        },
        {
          name: "roles_id",
          using: "BTREE",
          fields: [{ name: "roles_id" }],
        },
      ],
    }
  );
};
