const express = require("express");
const { body } = require("express-validator");

const { Client } = require("../models");
const clientController = require("../controllers/clientController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new client with validation
router.post(
  "/register",
  [
    body("tenant_id").notEmpty().withMessage("Tenant ID is required"),
    body("first_name").notEmpty().withMessage("First Name is required"),
    body("last_name").notEmpty().withMessage("Last Name is required"),
    body("father_name").notEmpty().withMessage("Father Name is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("nic")
      .notEmpty()
      .withMessage("NIC is required")
      .custom(async (value) => {
        const client = await Client.findOne({ where: { nic: value } });
        if (client) {
          return Promise.reject("NIC number already in use");
        }
      }),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("dob").optional().isDate().withMessage("Invalid date of birth format"),
    body("occupation")
      .optional()
      .notEmpty()
      .withMessage("Occupation cannot be empty"),
    body("cast").optional().notEmpty().withMessage("Cast cannot be empty"),
    body("status").optional().notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  clientController.registerClient
);

// Get all clients
router.get("/", clientController.getAllClients);

// Get a client by ID
router.get("/:id", clientController.getClientById);

// Update a client by ID with validation
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
      .withMessage("First Name cannot be empty"),
    body("last_name")
      .optional()
      .notEmpty()
      .withMessage("Last Name cannot be empty"),
    body("father_name")
      .optional()
      .notEmpty()
      .withMessage("Father Name cannot be empty"),
    body("phone").optional().notEmpty().withMessage("Phone cannot be empty"),
    body("address")
      .optional()
      .notEmpty()
      .withMessage("Address cannot be empty"),
    body("nic")
      .optional()
      .notEmpty()
      .withMessage("NIC cannot be empty")
      .custom(async (value, { req }) => {
        const client = await Client.findOne({ where: { nic: value } });
        if (client && client.id !== parseInt(req.params.id)) {
          return Promise.reject("NIC number already in use");
        }
      }),
    body("email")
      .optional()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Invalid email format"),
    body("dob").optional().isDate().withMessage("Invalid date of birth format"),
    body("occupation")
      .optional()
      .notEmpty()
      .withMessage("Occupation cannot be empty"),
    body("cast").optional().notEmpty().withMessage("Cast cannot be empty"),
    body("status").optional().notEmpty().withMessage("Status cannot be empty"),
  ],
  handleValidationErrors,
  clientController.updateClient
);

// Delete a client by ID
router.delete("/:id", clientController.deleteClient);

module.exports = router;
