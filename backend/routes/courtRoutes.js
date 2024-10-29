const express = require("express");
const { body } = require("express-validator");

const { Court } = require("../models");
const courtController = require("../controllers/courtController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new court
router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .custom(async (value) => {
        const court = await Court.findOne({ where: { name: value } });
        if (court) return Promise.reject("Court already exists");
      }),
    body("type").notEmpty().withMessage("Type is required"),
    body("province").notEmpty().withMessage("Province is required"),
    body("division").notEmpty().withMessage("Division is required"),
    body("district").notEmpty().withMessage("District is required"),
    body("tehsil").notEmpty().withMessage("Tehsil is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  courtController.registerCourt
);

// Get all courts
router.get("/", courtController.getAllCourts);

// Get court by ID
router.get("/:id", courtController.getCourtById);

// Update court by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Name is required")
      .custom(async (value, { req }) => {
        const court = await Court.findOne({ where: { name: value } });
        if (court && court.id != req.params.id)
          return Promise.reject("Court already exists");
      }),
    body("type").optional().notEmpty().withMessage("Type is required"),
    body("province").optional().notEmpty().withMessage("Province is required"),
    body("division").optional().notEmpty().withMessage("Division is required"),
    body("district").optional().notEmpty().withMessage("District is required"),
    body("tehsil").optional().notEmpty().withMessage("Tehsil is required"),
    body("status").optional().notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  courtController.updateCourt
);

// Delete court by ID
router.delete("/:id", courtController.deleteCourt);

module.exports = router;
