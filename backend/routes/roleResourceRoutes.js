const express = require("express");
const { body } = require("express-validator");

const { Role, Resource } = require("../models");
const roleResourceController = require("../controllers/roleResourceController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new role resource
router.post(
  "/register",
  [
    body("role_id")
      .notEmpty()
      .withMessage("Role ID is required")
      .custom(roleResourceController.entityExists(Role, "Role")),
    body("resource_id")
      .notEmpty()
      .withMessage("Resource ID is required")
      .custom(roleResourceController.entityExists(Resource, "Resource")),
    body("can_add")
      .optional()
      .isBoolean()
      .withMessage("Can Add must be a boolean"),
    body("can_edit")
      .optional()
      .isBoolean()
      .withMessage("Can Edit must be a boolean"),
    body("can_view")
      .optional()
      .isBoolean()
      .withMessage("Can View must be a boolean"),
    body("can_delete")
      .optional()
      .isBoolean()
      .withMessage("Can Delete must be a boolean"),
  ],
  handleValidationErrors,
  roleResourceController.registerRoleResource
);

// Get all role resources
router.get("/", roleResourceController.getAllRoleResources);

// Get a role resource by ID
router.get("/:id", roleResourceController.getRoleResourceById);

// Update a role resource by ID
router.put(
  "/:id",
  [
    body("role_id")
      .optional()
      .custom(roleResourceController.entityExists(Role, "Role")),
    body("resource_id")
      .optional()
      .custom(roleResourceController.entityExists(Resource, "Resource")),
    body("can_add")
      .optional()
      .isBoolean()
      .withMessage("Can Add must be a boolean"),
    body("can_edit")
      .optional()
      .isBoolean()
      .withMessage("Can Edit must be a boolean"),
    body("can_view")
      .optional()
      .isBoolean()
      .withMessage("Can View must be a boolean"),
    body("can_delete")
      .optional()
      .isBoolean()
      .withMessage("Can Delete must be a boolean"),
  ],
  handleValidationErrors,
  roleResourceController.updateRoleResourceById
);

// Delete a role resource by ID
router.delete("/:id", roleResourceController.deleteRoleResourceById);

module.exports = router;
