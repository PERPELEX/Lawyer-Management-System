var DataTypes = require("sequelize").DataTypes;
var _case_parties = require("./case_parties");
var _cases = require("./cases");
var _categories = require("./categories");
var _clients = require("./clients");
var _courts = require("./courts");
var _judges = require("./judges");
var _proceedings = require("./proceedings");
var _proceedings_logs = require("./proceedings_logs");
var _resources = require("./resources");
var _roles = require("./roles");
var _roles_resources = require("./roles_resources");
var _sequelizemeta = require("./sequelizemeta");
var _tenant = require("./tenant");
var _user = require("./users");
var _users_roles = require("./users_roles");

function initModels(sequelize) {
  var case_parties = _case_parties(sequelize, DataTypes);
  var cases = _cases(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var courts = _courts(sequelize, DataTypes);
  var judges = _judges(sequelize, DataTypes);
  var proceedings = _proceedings(sequelize, DataTypes);
  var proceedings_logs = _proceedings_logs(sequelize, DataTypes);
  var resources = _resources(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var roles_resources = _roles_resources(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var tenant = _tenant(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var users_roles = _users_roles(sequelize, DataTypes);

  case_parties.belongsTo(cases, { as: "case", foreignKey: "case_id" });
  cases.hasMany(case_parties, { as: "case_parties", foreignKey: "case_id" });
  proceedings.belongsTo(cases, { as: "case", foreignKey: "case_id" });
  cases.hasMany(proceedings, { as: "proceedings", foreignKey: "case_id" });
  cases.belongsTo(categories, { as: "category", foreignKey: "category_id" });
  categories.hasMany(cases, { as: "cases", foreignKey: "category_id" });
  cases.belongsTo(categories, {
    as: "subcategory",
    foreignKey: "subcategory_id",
  });
  categories.hasMany(cases, {
    as: "subcategory_cases",
    foreignKey: "subcategory_id",
  });
  categories.belongsTo(categories, {
    as: "parent_category",
    foreignKey: "parent_category_id",
  });
  categories.hasMany(categories, {
    as: "categories",
    foreignKey: "parent_category_id",
  });
  cases.belongsTo(clients, { as: "client", foreignKey: "client_id" });
  clients.hasMany(cases, { as: "cases", foreignKey: "client_id" });
  cases.belongsTo(courts, { as: "court", foreignKey: "court_id" });
  courts.hasMany(cases, { as: "cases", foreignKey: "court_id" });
  proceedings.belongsTo(courts, { as: "court", foreignKey: "court_id" });
  courts.hasMany(proceedings, { as: "proceedings", foreignKey: "court_id" });
  cases.belongsTo(judges, { as: "judge", foreignKey: "judge_id" });
  judges.hasMany(cases, { as: "cases", foreignKey: "judge_id" });
  proceedings.belongsTo(judges, { as: "judge", foreignKey: "judge_id" });
  judges.hasMany(proceedings, { as: "proceedings", foreignKey: "judge_id" });
  proceedings_logs.belongsTo(proceedings, {
    as: "proceeding",
    foreignKey: "proceeding_id",
  });
  proceedings.hasMany(proceedings_logs, {
    as: "proceedings_logs",
    foreignKey: "proceeding_id",
  });
  roles_resources.belongsTo(resources, {
    as: "resource",
    foreignKey: "resource_id",
  });
  resources.hasMany(roles_resources, {
    as: "roles_resources",
    foreignKey: "resource_id",
  });
  roles_resources.belongsTo(roles, { as: "role", foreignKey: "roles_id" });
  roles.hasMany(roles_resources, {
    as: "roles_resources",
    foreignKey: "roles_id",
  });
  users_roles.belongsTo(roles, { as: "role", foreignKey: "role_id" });
  roles.hasMany(users_roles, { as: "users_roles", foreignKey: "role_id" });
  cases.belongsTo(tenant, { as: "tenant", foreignKey: "tenant_id" });
  tenant.hasMany(cases, { as: "cases", foreignKey: "tenant_id" });
  clients.belongsTo(tenant, { as: "tenant", foreignKey: "tenant_id" });
  tenant.hasMany(clients, { as: "clients", foreignKey: "tenant_id" });
  user.belongsTo(tenant, { as: "tenant", foreignKey: "tenant_id" });
  tenant.hasMany(user, { as: "user", foreignKey: "tenant_id" });
  cases.belongsTo(user, { as: "lawyer", foreignKey: "lawyer_id" });
  user.hasMany(cases, { as: "cases", foreignKey: "lawyer_id" });
  cases.belongsTo(user, { as: "created_by_user", foreignKey: "created_by" });
  user.hasMany(cases, { as: "created_by_cases", foreignKey: "created_by" });
  cases.belongsTo(user, { as: "updated_by_user", foreignKey: "updated_by" });
  user.hasMany(cases, { as: "updated_by_cases", foreignKey: "updated_by" });
  proceedings.belongsTo(user, {
    as: "created_by_user",
    foreignKey: "created_by",
  });
  user.hasMany(proceedings, { as: "proceedings", foreignKey: "created_by" });
  proceedings_logs.belongsTo(user, {
    as: "modified_by_user",
    foreignKey: "modified_by",
  });
  user.hasMany(proceedings_logs, {
    as: "proceedings_logs",
    foreignKey: "modified_by",
  });
  users_roles.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(users_roles, { as: "users_roles", foreignKey: "user_id" });

  return {
    case_parties,
    cases,
    categories,
    clients,
    courts,
    judges,
    proceedings,
    proceedings_logs,
    resources,
    roles,
    roles_resources,
    sequelizemeta,
    tenant,
    user,
    users_roles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
