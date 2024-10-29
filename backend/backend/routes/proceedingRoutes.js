const express = require("express");
const { body } = require("express-validator");

const { Case, Court, Judge, User } = require("../models");
const proceedingController = require("../controllers/proceedingController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new proceeding
router.post(
  "/register",
  [
    body("case_id")
      .notEmpty()
      .withMessage("Case ID is required")
      .custom(proceedingController.entityExistsAndIsActive(Case, "Case")),
    body("court_id")
      .notEmpty()
      .withMessage("Court ID is required")
      .custom(proceedingController.entityExistsAndIsActive(Court, "Court")),
    body("judge_id")
      .notEmpty()
      .withMessage("Judge ID is required")
      .custom(proceedingController.entityExistsAndIsActive(Judge, "Judge")),
    body("next_hearing_date")
      .isDate()
      .withMessage("Next Hearing Date must be a valid date")
      .notEmpty()
      .withMessage("Next Hearing Date is required"),
    body("notes").optional().notEmpty().withMessage("Notes is required"),
    body("created_by")
      .notEmpty()
      .withMessage("Created By(User) is required")
      .custom(proceedingController.entityExistsAndIsActive(User, "User")),
  ],
  handleValidationErrors,
  proceedingController.registerProceeding
);

// Get all proceedings
router.get("/", proceedingController.getAllProceedings);

// Get a proceeding by ID
router.get("/:id", proceedingController.getProceedingById);

// Update a proceeding by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("case_id")
      .optional()
      .notEmpty()
      .withMessage("Case ID is required")
      .custom(proceedingController.entityExistsAndIsActive(Case, "Case")),
    body("court_id")
      .optional()
      .notEmpty()
      .withMessage("Court ID is required")
      .custom(proceedingController.entityExistsAndIsActive(Court, "Court")),
    body("judge_id")
      .optional()
      .notEmpty()
      .withMessage("Judge ID is required")
      .custom(proceedingController.entityExistsAndIsActive(Judge, "Judge")),
    body("next_hearing_date")
      .optional()
      .isDate()
      .withMessage("Next Hearing Date must be a valid date")
      .notEmpty()
      .withMessage("Next Hearing Date is required"),
    body("notes").optional().notEmpty().withMessage("Notes is required"),
  ],
  handleValidationErrors,
  proceedingController.updateProceedingById
);

// Delete a proceeding by ID
router.delete("/:id", proceedingController.deleteProceedingById);

module.exports = router;
