const express = require("express");
const { body } = require("express-validator");

const { Case } = require("../models");
const casePartyController = require("../controllers/casePartyController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

router.post(
  "/register",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is required");
      }
      return true;
    }),
    body("case_id")
      .notEmpty()
      .withMessage("Case ID is required")
      .custom(casePartyController.entityExistsAndIsActive(Case, "Case")),
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("father_name").notEmpty().withMessage("Father name is required"),
    body("dob")
      .isDate()
      .withMessage("DOB must be in valid format")
      .notEmpty()
      .withMessage("Date of birth is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("cast").notEmpty().withMessage("Cast is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("cnic").notEmpty().withMessage("CNIC is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("type").notEmpty().withMessage("Type is required"),
  ],
  handleValidationErrors,
  casePartyController.registerCaseParty
);

router.get("/", casePartyController.getAllCaseParties);
router.get("/:id", casePartyController.getCasePartyById);

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
      .custom(casePartyController.entityExistsAndIsActive(Case, "Case")),
    body("first_name")
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    body("last_name")
      .optional()
      .notEmpty()
      .withMessage("Last name is required"),
    body("father_name")
      .optional()
      .notEmpty()
      .withMessage("Father name is required"),
    body("dob").optional().isDate().withMessage("DOB must be in valid format"),
    body("gender").optional().notEmpty().withMessage("Gender is required"),
    body("cast").optional().notEmpty().withMessage("Cast is required"),
    body("address").optional().notEmpty().withMessage("Address is required"),
    body("cnic").optional().notEmpty().withMessage("CNIC is required"),
    body("phone").optional().notEmpty().withMessage("Phone is required"),
    body("type").optional().notEmpty().withMessage("Type is required"),
  ],
  handleValidationErrors,
  casePartyController.updateCaseParty
);

router.delete("/:id", casePartyController.deleteCaseParty);

module.exports = router;
