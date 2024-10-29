const express = require("express");
const { body } = require("express-validator");

const judgeController = require("../controllers/judgeController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new judge
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("designation").notEmpty().withMessage("Designation is required"),
    body("status").optional().notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  judgeController.registerJudge
);

// Get all judges
router.get("/", judgeController.getAllJudges);

// Get judge by ID
router.get("/:id", judgeController.getJudgeById);

// Update judge by ID
router.put(
  "/:id",
  [
    body().custom((_, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error("Request body is missing");
      }
      return true;
    }),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("designation")
      .optional()
      .notEmpty()
      .withMessage("Designation is required"),
    body("status").optional().notEmpty().withMessage("Status is required"),
  ],
  handleValidationErrors,
  judgeController.updateJudge
);

// Delete judge by ID
router.delete("/:id", judgeController.deleteJudge);

module.exports = router;
