const { Court } = require("../models");

// Helper function to find a court by ID
const findCourtById = async (id, res) => {
  try {
    const court = await Court.findByPk(id);
    if (!court) {
      res.status(404).json({ message: "Court not found" });
      return null;
    }
    return court;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Controller to register a new court
exports.registerCourt = async (req, res) => {
  try {
    const court = await Court.create(req.body);
    res.status(201).json({ message: "Court added successfully", court: court });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all courts
exports.getAllCourts = async (req, res) => {
  try {
    const courts = await Court.findAll();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a court by ID
exports.getCourtById = async (req, res) => {
  const court = await findCourtById(req.params.id, res);
  if (court) {
    res.status(200).json(court);
  }
};

// Controller to update a court by ID
exports.updateCourt = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const court = await findCourtById(id, res);
    if (!court) return;

    // Check if fields have changed
    let isModified = Object.keys(updates).some(
      (key) => updates[key] !== court[key]
    );

    if (!isModified)
      return res.status(200).json({
        message: "No changes detected. Court data remains the same.",
      });

    await court.update(updates);
    res
      .status(200)
      .json({ message: "Court updated successfully", court: court });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a court by ID
exports.deleteCourt = async (req, res) => {
  const court = await findCourtById(req.params.id, res);
  if (!court) return;

  try {
    await court.destroy();
    res.status(200).json({ message: "Court deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
