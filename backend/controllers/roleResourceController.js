const { RoleResource } = require("../models");

// Helper: Finds a RoleResource by ID
const findRoleResourceById = async (id, res) => {
  try {
    const roleResource = await RoleResource.findByPk(id);
    if (!roleResource) {
      res.status(404).json({ message: "Role-resource not found" });
      return null;
    }
    return roleResource;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Custom validator to check if an entity exists
exports.entityExists = (model, modelName) => {
  return async (id) => {
    const instance = await model.findByPk(id);
    if (!instance) {
      return Promise.reject(`${modelName} not found`);
    }
    return true;
  };
};

// Controller: Register a new role resource
exports.registerRoleResource = async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const newRoleResourceData = req.body;

  try {
    const existingRoleResource = await RoleResource.findOne({
      where: {
        role_id: newRoleResourceData.role_id,
        resource_id: newRoleResourceData.resource_id,
      },
    });
    if (existingRoleResource) {
      return res.status(400).json({ message: "Role-resource already exists" });
    }

    Object.assign(newRoleResourceData, {
      can_add: newRoleResourceData.can_add ?? false,
      can_edit: newRoleResourceData.can_edit ?? false,
      can_view: newRoleResourceData.can_view ?? false,
      can_delete: newRoleResourceData.can_delete ?? false,
    });

    const newRoleResource = await RoleResource.create(newRoleResourceData);
    res.status(201).json({
      message: "Role-resource created successfully.",
      newRoleResource: newRoleResource,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Get all role resources
exports.getAllRoleResources = async (req, res) => {
  try {
    const roleResources = await RoleResource.findAll();
    res.status(200).json(roleResources);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Get a role resource by ID
exports.getRoleResourceById = async (req, res) => {
  try {
    const roleResource = await RoleResource.findByPk(req.params.id);
    if (!roleResource) {
      return res.status(404).json({ message: "Role-resource not found" });
    }
    res.status(200).json(roleResource);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Update a role resource by ID
exports.updateRoleResourceById = async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const updatedData = req.body;

  try {
    const roleResource = await findRoleResourceById(req.params.id, res);
    if (!roleResource) return;

    let isModified = Object.keys(updatedData).some(
      (key) => updatedData[key] !== roleResource[key]
    );

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. Role-resource data remains the same.",
      });
    }

    const existingRoleResource = await RoleResource.findOne({
      where: {
        role_id: updatedData.role_id
          ? updatedData.role_id
          : roleResource.role_id,
        resource_id: updatedData.resource_id
          ? updatedData.resource_id
          : roleResource.resource_id,
      },
    });
    if (existingRoleResource && existingRoleResource.id != req.params.id) {
      return res.status(400).json({ message: "Role-resource already exists" });
    }

    await roleResource.update(updatedData);
    res.status(200).json({
      message: "Role-resource updated successfully",
      roleResource: roleResource,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Delete a role resource by ID
exports.deleteRoleResourceById = async (req, res) => {
  try {
    const roleResource = await findRoleResourceById(req.params.id, res);
    if (!roleResource) return;

    await roleResource.destroy();
    res.status(200).json({ message: "Role-resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
