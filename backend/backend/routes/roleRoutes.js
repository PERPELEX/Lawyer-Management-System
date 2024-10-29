const express = require("express");
const { body } = require("express-validator");

const { Role } = require("../models");
const roleController = require("../controllers/roleController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new role
router.post(
  "/register",
  [
    body("role_name")
      .notEmpty()
      .withMessage("Role name is required")
      .custom(async (value) => {
        const role = await Role.findOne({ where: { role_name: value } });
        if (role) return Promise.reject("Role already exists");
      }),
  ],
  handleValidationErrors,
  roleController.registerRole
);

// Get all roles
router.get("/", roleController.getAllRoles);

// Get a role by ID
router.get("/:id", roleController.getRoleById);

// Update a role by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("role_name")
      .notEmpty()
      .withMessage("Role name is required")
      .custom(async (value, { req }) => {
        const role = await Role.findOne({ where: { role_name: value } });
        if (role && role.id != req.params.id)
          return Promise.reject("Role already exists");
      }),
  ],
  handleValidationErrors,
  roleController.updateRole
);

// Delete a role by ID
router.delete("/:id", roleController.deleteRole);

module.exports = router;
