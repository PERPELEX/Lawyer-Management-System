const { User_role } = require("../models");

// Helper: Finds a UserRole by ID
const findUserRoleById = async (id, res) => {
  try {
    const userRole = await User_role.findByPk(id);
    if (!userRole) {
      res.status(404).json({ message: "User-role not found" });
      return null;
    }
    return userRole;
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

// Controller: Register a new user role
exports.registerUserRole = async (req, res) => {
  const { user_id, role_id } = req.body;

  try {
    const existingUserRole = await User_role.findOne({
      where: { user_id, role_id },
    });
    if (existingUserRole) {
      return res.status(400).json({ message: "User-role already exists" });
    }

    const userRole = await User_role.create({ user_id, role_id });
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Get all user roles
exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await User_role.findAll();
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Get user role by ID
exports.getUserRoleById = async (req, res) => {
  try {
    const userRole = await findUserRoleById(req.params.id, res);
    if (!userRole) return;

    res.status(200).json(userRole);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Update user role by ID
exports.updateUserRoleById = async (req, res) => {
  const updateData = req.body;

  try {
    const userRole = await findUserRoleById(req.params.id, res);
    if (!userRole) return;

    let isModified = Object.keys(updateData).some(
      (key) => userRole[key] !== updateData[key]
    );
    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. User-role data remains the same.",
      });
    }

    const existingUserRole = await User_role.findOne({
      where: {
        user_id: updateData.user_id ? updateData.user_id : userRole.user_id,
        role_id: updateData.role_id ? updateData.role_id : userRole.role_id,
      },
    });
    if (existingUserRole && existingUserRole.id != req.params.id) {
      return res.status(400).json({ message: "User-role already exists" });
    }

    await userRole.update(updateData);
    res.status(200).json({
      message: "User-role updated successfully.",
      userRole: userRole,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller: Delete user role by ID
exports.deleteUserRoleById = async (req, res) => {
  try {
    const userRole = await findUserRoleById(req.params.id, res);
    if (!userRole) return;

    await userRole.destroy();
    res.status(200).json({ message: "User-role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
