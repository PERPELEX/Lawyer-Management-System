const { Resource } = require("../models");

// Helper function to find a resource by ID
const findResourceById = async (id, res) => {
  try {
    const resource = await Resource.findByPk(id);
    if (!resource) {
      res.status(404).json({ message: "Resource not found" });
      return null;
    }
    return resource;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Controller to register a new resource
exports.registerResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res
      .status(201)
      .json({ message: "Resource created successfully", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a resource by ID
exports.getResourceById = async (req, res) => {
  const resource = await findResourceById(req.params.id, res);
  if (resource) res.status(200).json(resource);
};

// Controller to update a resource by ID
exports.updateResource = async (req, res) => {
  try {
    const resource = await findResourceById(req.params.id, res);
    if (!resource) return;

    if (resource.name === req.body.name) {
      return res.status(200).json({
        message: "No changes detected. Resource data remains the same.",
      });
    }

    await resource.update(req.body);
    res
      .status(200)
      .json({ message: "Resource updated successfully", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a resource by ID
exports.deleteResource = async (req, res) => {
  const resource = await findResourceById(req.params.id, res);
  if (!resource) return;

  try {
    await resource.destroy();
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
