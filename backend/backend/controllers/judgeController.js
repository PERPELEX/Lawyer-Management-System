const { Judge } = require("../models");

// Helper function to find a judge by ID
const findJudgeById = async (id, res) => {
  try {
    const judge = await Judge.findByPk(id);
    if (!judge) {
      res.status(404).json({ message: "Judge not found" });
      return null;
    }
    return judge;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Controller to register a new judge
exports.registerJudge = async (req, res) => {
  const { name, designation, status } = req.body;

  const newJudgeData = {
    name,
    designation,
    status: status || "active",
  };

  try {
    const judge = await Judge.create(newJudgeData);
    res.status(201).json({ message: "Judge added successfully", judge: judge });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get all judges
exports.getAllJudges = async (req, res) => {
  try {
    const judges = await Judge.findAll();
    res.status(200).json(judges);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get a judge by ID
exports.getJudgeById = async (req, res) => {
  const { id } = req.params;
  const judge = await findJudgeById(id, res);
  if (judge) res.status(200).json(judge);
};

// Controller to update a judge by ID
exports.updateJudge = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const judge = await findJudgeById(id, res);
    if (!judge) return;

    // Check if fields have changed
    let isModified = Object.keys(updates).some(
      (key) => updates[key] !== judge[key]
    );

    if (!isModified) {
      return res.status(200).json({
        message: "No changes detected. Judge data remains the same.",
      });
    }

    await judge.update(req.body);
    res.status(200).json(judge);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a judge by ID
exports.deleteJudge = async (req, res) => {
  const judge = await findJudgeById(req.params.id, res);
  if (!judge) return;

  try {
    await judge.destroy();
    res.status(200).json({ message: "Judge deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
