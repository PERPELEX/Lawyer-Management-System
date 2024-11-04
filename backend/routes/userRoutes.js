const express = require("express");
const { body } = require("express-validator");

const { User } = require("../models");
const userController = require("../controllers/userController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Validation and Register a new user
router.post(
  "/register",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("tenant_id").notEmpty().withMessage("Tenant ID is required"),
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .custom(async (value) => {
        const user = await User.findOne({ where: { username: value } });
        if (user) {
          return Promise.reject("Username already in use");
        }
      }),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleValidationErrors,
  userController.registerUser
);

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Validation and Update user by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("first_name")
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    body("last_name")
      .optional()
      .notEmpty()
      .withMessage("Last name is required"),
    body("username")
      .optional()
      .notEmpty()
      .withMessage("Username is required")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ where: { username: value } });
        if (user && user.id !== parseInt(req.params.id)) {
          return Promise.reject("Username already in use");
        }
      }),
    body("password").optional().notEmpty().withMessage("Password is required"),
    body("status").optional().notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  userController.updateUser
);

// Delete user by ID
router.delete("/:id", userController.deleteUser);

// --------------------------------------------  Custom Routes --------------------------------------------

// Get cases by user ID
router.get("/:id/cases", userController.getUserCasesById);

// Get upcoming hearings by user ID
router.get(
  "/:id/upcoming-hearings",
  userController.getUserUpcomingHearingsById
);

module.exports = router;
