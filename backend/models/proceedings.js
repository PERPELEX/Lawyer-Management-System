const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Proceeding",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      case_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "cases",
          key: "id",
        },
      },
      court_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "courts",
          key: "id",
        },
      },
      judge_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "judges",
          key: "id",
        },
      },
      next_hearing_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "proceedings",
      timestamps: true,
      updatedAt: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "proceedings_case_id_idx",
          using: "BTREE",
          fields: [{ name: "case_id" }],
        },
        {
          name: "user_creator_id_idx",
          using: "BTREE",
          fields: [{ name: "created_by" }],
        },
        {
          name: "judge_id_idx",
          using: "BTREE",
          fields: [{ name: "judge_id" }],
        },
        {
          name: "proceeding_court_id_idx",
          using: "BTREE",
          fields: [{ name: "court_id" }],
        },
      ],
    }
  );
};
