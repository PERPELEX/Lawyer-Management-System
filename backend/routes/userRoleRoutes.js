const express = require("express");
const { body } = require("express-validator");

const { User, Role } = require("../models");
const userRoleController = require("../controllers/userRoleController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new user role
router.post(
  "/register",
  [
    body("user_id")
      .notEmpty()
      .withMessage("User ID is required")
      .custom(userRoleController.entityExists(User, "User")),
    body("role_id")
      .notEmpty()
      .withMessage("Role ID is required")
      .custom(userRoleController.entityExists(Role, "Role")),
  ],
  handleValidationErrors,
  userRoleController.registerUserRole
);

// Get all user roles
router.get("/", userRoleController.getAllUserRoles);

// Get user role by ID
router.get("/:id", userRoleController.getUserRoleById);

// Update user role by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("user_id")
      .optional()
      .custom(userRoleController.entityExists(User, "User")),
    body("role_id")
      .optional()
      .custom(userRoleController.entityExists(Role, "Role")),
  ],
  handleValidationErrors,
  userRoleController.updateUserRoleById
);

// Delete user role by ID
router.delete("/:id", userRoleController.deleteUserRoleById);

module.exports = router;
