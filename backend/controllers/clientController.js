const { Client, Tenant } = require("../models");

// Helper function to find a client by ID
const findClientById = async (id, res) => {
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return null;
    }
    return client;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    return null;
  }
};

// Controller to register a new client
exports.registerClient = async (req, res) => {
  const {
    tenant_id,
    first_name,
    last_name,
    father_name,
    phone,
    address,
    nic,
    email,
    dob,
    occupation,
    cast,
    status = status ? status : "active",
  } = req.body;

  try {
    // Check if the tenant is active
    const tenant = await Tenant.findByPk(tenant_id, { attributes: ["status"] });
    if (!tenant || tenant.status !== "active") {
      return res.status(400).json({
        message:
          "Client cannot be created for this tenant. Tenant is not active",
      });
    }

    // Create new client
    const newClient = await Client.create({
      tenant_id,
      first_name,
      last_name,
      father_name,
      phone,
      address,
      nic,
      email,
      dob,
      occupation,
      cast,
      status,
    });

    return res
      .status(201)
      .json({ message: "Client created successfully", client: newClient });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    return res.status(200).json(clients);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to get a client by ID
exports.getClientById = async (req, res) => {
  const client = await findClientById(req.params.id, res);
  if (!client) return;

  return res.status(200).json(client);
};

// Controller to update a client by ID
exports.updateClient = async (req, res) => {
  const updates = req.body;

  try {
    const client = await findClientById(req.params.id, res);
    if (!client) return;

    // Check if the fields are modified
    let isModified = Object.keys(updates).some(
      (key) => key !== "updatedAt" && updates[key] !== client[key]
    );

    if (!isModified)
      return res.status(200).json({
        message: "No changes detected. Client data remains the same.",
      });

    // Perform the update if changes are detected
    await client.update(updates);
    return res
      .status(200)
      .json({ message: "Client updated successfully", client });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const client = await findClientById(req.params.id, res);
    if (!client) return;

    await client.destroy();
    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
