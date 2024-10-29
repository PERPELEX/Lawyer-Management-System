const { Role } = require("../models");

// Helper function to find a role by ID
const findRoleById = async (id, res) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return null;
    }
    return role;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Controller to register a new role
exports.registerRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ message: "Role registered successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a role by ID
exports.getRoleById = async (req, res) => {
  const role = await findRoleById(req.params.id, res);
  if (role) {
    res.status(200).json(role);
  }
};

// Controller to update a role by ID
exports.updateRole = async (req, res) => {
  try {
    const role = await findRoleById(req.params.id, res);
    if (!role) return;

    if (role.role_name === req.body.role_name) {
      return res.status(200).json({
        message: "No changes detected. Role data remains the same.",
      });
    }

    await role.update(req.body);
    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a role by ID
exports.deleteRole = async (req, res) => {
  const role = await findRoleById(req.params.id, res);
  if (!role) return;

  try {
    await Role.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
