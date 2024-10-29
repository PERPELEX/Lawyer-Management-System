const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Case",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "clients",
          key: "id",
        },
      },
      lawyer_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      tenant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "tenant",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
      subcategory_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
      fir_number: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      offence: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      court_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "courts",
          key: "id",
        },
      },
      judge_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: "judges",
          key: "id",
        },
      },
      date_of_institution: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      police_station: {
        type: DataTypes.STRING(255),
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
      updated_by: {
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
      tableName: "cases",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "case_client_id_idx",
          using: "BTREE",
          fields: [{ name: "client_id" }],
        },
        {
          name: "case_user_id_idx",
          using: "BTREE",
          fields: [{ name: "lawyer_id" }],
        },
        {
          name: "case_tenant_id_idx",
          using: "BTREE",
          fields: [{ name: "tenant_id" }],
        },
        {
          name: "case_judge_id_idx",
          using: "BTREE",
          fields: [{ name: "judge_id" }],
        },
        {
          name: "case_court_id_idx",
          using: "BTREE",
          fields: [{ name: "court_id" }],
        },
        {
          name: "case_subcat_id_idx",
          using: "BTREE",
          fields: [{ name: "subcategory_id" }],
        },
        {
          name: "case_cat_id_idx",
          using: "BTREE",
          fields: [{ name: "category_id" }],
        },
        {
          name: "cases_ibfk_8_idx",
          using: "BTREE",
          fields: [{ name: "created_by" }],
        },
        {
          name: "updated_by",
          using: "BTREE",
          fields: [{ name: "updated_by" }],
        },
      ],
    }
  );
};
