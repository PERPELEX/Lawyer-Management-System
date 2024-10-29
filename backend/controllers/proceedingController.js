const { Proceeding, Proceeding_log } = require("../models");
const handleValidationErrors = require("../utils/validationHandler");

// Helper function: Find proceeding by ID
const findProceedingById = async (id, res) => {
  try {
    const proceeding = await Proceeding.findByPk(id);
    if (!proceeding) {
      res.status(404).json({ message: "Proceeding not found" });
      return null;
    }
    return proceeding;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Helper function: Add proceeding logs
const addProceedingLogs = async (
  proceedingId,
  updatedBy,
  oldValues,
  newValues
) => {
  try {
    await Proceeding_log.create({
      proceeding_id: proceedingId,
      updated_by: updatedBy,
      old_values: oldValues,
      new_values: newValues,
    });
  } catch (error) {
    console.log("Error adding proceeding logs: ", error.message);
  }
};

// Custom validator to check if an entity exists and is active
exports.entityExistsAndIsActive = (model, modelName) => {
  return async (id) => {
    const instance = await model.findByPk(id);
    if (!instance) {
      return Promise.reject(`${modelName} not found`);
    } else if (instance.status !== "active") {
      return Promise.reject(`${modelName} is not active`);
    }
    return true;
  };
};

// Controller function: Register a new proceeding
exports.registerProceeding = async (req, res) => {
  const proceedingData = req.body;

  try {
    const proceeding = await Proceeding.create(proceedingData);
    res.status(201).json({
      message: "Proceeding added successfully.",
      proceeding: proceeding,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function: Get all proceedings
exports.getAllProceedings = async (req, res) => {
  try {
    const proceedings = await Proceeding.findAll();
    res.status(200).json(proceedings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function: Get proceeding by ID
exports.getProceedingById = async (req, res) => {
  try {
    const proceeding = await findProceedingById(req.params.id, res);
    if (!proceeding) return;

    res.status(200).json(proceeding);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function: Update proceeding by ID
exports.updateProceedingById = async (req, res) => {
  const updateData = req.body;

  try {
    const proceeding = await findProceedingById(req.params.id, res);
    if (!proceeding) return;

    let isModified = Object.keys(updateData).some(
      (key) => updateData[key] !== proceeding[key]
    );

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. Proceeding data remains the same.",
      });
    }

    const oldData = proceeding;

    await proceeding.update(updateData);

    addProceedingLogs(
      proceeding.id,
      updateData.updated_by,
      oldData,
      updateData
    );

    res.status(200).json({ message: "Proceeding updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function: Delete proceeding by ID
exports.deleteProceedingById = async (req, res) => {
  try {
    const proceeding = await findProceedingById(req.params.id, res);
    if (!proceeding) return;

    await proceeding.destroy();
    res.status(200).json({ message: "Proceeding deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
