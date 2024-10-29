const { Case_party } = require("../models");

// Custom validation error handler
const handleValidationErrors = require("../utils/validationHandler");

const findCasePartyById = async (id, res) => {
  try {
    const caseParty = await Case_party.findByPk(id);
    if (!caseParty) {
      res.status(404).json({ message: "Case Party not found" });
      return null;
    }
    return caseParty;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Custom validator to check if an entity exists and is active
exports.entityExistsAndIsActive = (model, modelName) => {
  return async (id) => {
    const instance = await model.findByPk(id);
    if (!instance) {
      return Promise.reject(`${modelName} not found`);
    } else if (instance.case_status !== "active") {
      return Promise.reject(`${modelName} is not active`);
    }
    return true;
  };
};

// Controller for registering a new case party
exports.registerCaseParty = async (req, res) => {
  const newParty = req.body;

  try {
    const existingParty = await Case_party.findOne({
      where: { case_id: newParty.case_id, cnic: newParty.cnic },
    });
    if (existingParty) {
      return res
        .status(400)
        .json({ message: "Party already exists in the case" });
    }

    const caseParty = await Case_party.create(newParty);
    res.status(201).json({
      message: "Case-party created successfully.",
      caseParty: caseParty,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller for getting all case parties
exports.getAllCaseParties = async (req, res) => {
  try {
    const caseParties = await Case_party.findAll();
    res.status(200).json(caseParties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller for getting a case party by ID
exports.getCasePartyById = async (req, res) => {
  const caseParty = await findCasePartyById(req.params.id, res);
  if (caseParty) {
    res.status(200).json(caseParty);
  }
};

// Controller for updating a case party by ID
exports.updateCaseParty = async (req, res) => {
  const updatedParty = req.body;

  try {
    const caseParty = await findCasePartyById(req.params.id, res);
    if (!caseParty) return;

    let isModified = Object.keys(updatedParty).some(
      (key) => key !== "updatedAt" && updatedParty[key] != caseParty[key]
    );

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. Case-party data remains the same.",
      });
    }

    if (updatedParty.cnic !== caseParty.cnic) {
      const existingParty = await Case_party.findOne({
        where: { case_id: updatedParty.case_id, cnic: updatedParty.cnic },
      });
      if (existingParty) {
        return res
          .status(400)
          .json({ message: "Party already exists in the case" });
      }
    }

    await caseParty.update(updatedParty);
    res.status(200).json({
      message: "Case-party updated successfully.",
      caseParty: caseParty,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller for deleting a case party by ID
exports.deleteCaseParty = async (req, res) => {
  const caseParty = await findCasePartyById(req.params.id, res);
  if (caseParty) {
    try {
      await caseParty.destroy();
      res.status(200).json({ message: "Case-party deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};
