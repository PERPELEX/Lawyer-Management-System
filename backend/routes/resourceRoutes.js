const express = require("express");
const { body } = require("express-validator");

const { Resource } = require("../models");
const resourceController = require("../controllers/resourceController");
const handleValidationErrors = require("../utils/validationHandler");
const router = express.Router();

// Register a new resource
router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .custom(async (value) => {
        const resource = await Resource.findOne({ where: { name: value } });
        if (resource) return Promise.reject("Resource already exists");
      }),
  ],
  handleValidationErrors,
  resourceController.registerResource
);

// Get all resources
router.get("/", resourceController.getAllResources);

// Get a resource by ID
router.get("/:id", resourceController.getResourceById);

// Update a resource by ID
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
      .notEmpty()
      .withMessage("Name is required")
      .custom(async (value, { req }) => {
        const resource = await Resource.findOne({ where: { name: value } });
        if (resource && resource.id != req.params.id)
          return Promise.reject("Resource already exists");
      }),
  ],
  handleValidationErrors,
  resourceController.updateResource
);

// Delete a resource by ID
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
