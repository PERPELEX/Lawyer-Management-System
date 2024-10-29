const { Tenant } = require("../models");

// Helper function to find a tenant by ID
const findTenantById = async (id, res) => {
  try {
    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    return tenant;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to register a new tenant
exports.registerTenant = async (req, res) => {
  const { tenant_name, license_number, office_address, status } = req.body;

  try {
    const newTenant = await Tenant.create({
      tenant_name,
      license_number,
      office_address,
      status: status || "active",
    });
    return res.status(201).json({
      message: "Tenant registered successfully",
      tenant: newTenant,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to get all tenants
exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    return res.status(200).json(tenants);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to get a tenant by ID
exports.getTenantById = async (req, res) => {
  const tenant = await findTenantById(req.params.id, res);
  if (tenant) {
    return res.status(200).json(tenant);
  }
};

// Controller to update a tenant by ID
exports.updateTenant = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const tenant = await findTenantById(id, res);
    if (!tenant) return;

    let isModified = Object.keys(updates).some(
      (key) => tenant[key] !== updates[key]
    );

    if (!isModified) {
      return res.status(400).json({ message: "No changes to apply", tenant });
    }

    await tenant.update(updates);

    return res
      .status(200)
      .json({ message: "Tenant updated successfully", tenant });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a tenant by ID
exports.deleteTenant = async (req, res) => {
  const tenant = await findTenantById(req.params.id, res);
  if (!tenant) return;

  try {
    await tenant.destroy();
    return res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
