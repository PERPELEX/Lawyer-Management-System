const express = require("express");
const { body } = require("express-validator");

const { Tenant } = require("../models");
const tenantController = require("../controllers/tenantController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new tenant with validation
router.post(
  "/register",
  [
    body("tenant_name").notEmpty().withMessage("Tenant Name is required"),
    body("license_number")
      .notEmpty()
      .withMessage("License Number is required")
      .custom(async (value) => {
        const tenant = await Tenant.findOne({
          where: { license_number: value },
        });
        if (tenant) {
          throw new Error("License Number already in use");
        }
      }),
    body("office_address").notEmpty().withMessage("Office Address is required"),
  ],
  handleValidationErrors,
  tenantController.registerTenant
);

// Get all tenants
router.get("/", tenantController.getAllTenants);

// Get a tenant by ID
router.get("/:id", tenantController.getTenantById);

// Update a tenant by ID with validation
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("tenant_name")
      .optional()
      .notEmpty()
      .withMessage("Tenant Name is required"),
    body("license_number")
      .optional()
      .notEmpty()
      .withMessage("License Number is required")
      .custom(async (value, { req }) => {
        const existingTenant = await Tenant.findOne({
          where: { license_number: value },
        });
        if (existingTenant && existingTenant.id != req.params.id) {
          throw new Error("License number already in use by another tenant");
        }
      }),
    body("office_address")
      .optional()
      .notEmpty()
      .withMessage("Office Address is required"),
    body("status").optional().notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  tenantController.updateTenant
);

// Delete a tenant by ID
router.delete("/:id", tenantController.deleteTenant);

// --------------------------------------------  Custom Routes --------------------------------------------

// Get users by tenant ID
router.get("/users/:id", tenantController.getTenantUsersById);

// Get clients by tenant ID
router.get("/clients/:id", tenantController.getTenantClientsById);

// Get cases by tenant ID
router.get("/cases/:id", tenantController.getTenantCasesById);

// Get upcoming hearings by tenant ID
router.get("/hearings/:id", tenantController.getTenantUpcomingHearingsById);

module.exports = router;
