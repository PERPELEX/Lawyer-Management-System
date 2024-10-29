const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Case_party",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      case_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "cases",
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
      father_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      cast: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cnic: {
        type: DataTypes.STRING(13),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "case_parties",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "case_id",
          using: "BTREE",
          fields: [{ name: "case_id" }],
        },
      ],
    }
  );
};
