const bcrypt = require("bcryptjs");
const { User, Tenant } = require("../models");

// Helper function to find a user by ID
const findUserById = async (id, res) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return user;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to register a new user
exports.registerUser = async (req, res) => {
  const { first_name, last_name, tenant_id, username, password } = req.body;

  try {
    const tenant = await Tenant.findOne({
      where: { id: tenant_id },
      attributes: ["status"],
    });

    if (!tenant || tenant.status !== "active") {
      return res.status(400).json({
        message: "User cannot be created for this tenant. Tenant is not active",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      tenant_id,
      first_name,
      last_name,
      username,
      password: hashedPassword,
      status: "active",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to get a user by ID
exports.getUserById = async (req, res) => {
  const user = await findUserById(req.params.id, res);
  if (user) {
    return res.status(200).json(user);
  }
};

// Controller to update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await findUserById(id, res);
    if (!user) return;

    let isModified = Object.keys(updates).some(
      (key) => key !== "password" && updates[key] != user[key]
    );

    if (
      updates.password &&
      !(await bcrypt.compare(updates.password, user.password))
    ) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
      isModified = true;
    }

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. User data remains the same.",
      });
    }

    await user.update(updates);

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a user by ID
exports.deleteUser = async (req, res) => {
  const user = await findUserById(req.params.id, res);
  if (!user) return;

  try {
    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
