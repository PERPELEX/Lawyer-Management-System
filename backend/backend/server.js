const express = require("express");
const helmet = require("helmet");
const { sequelize } = require("./models");
const morgan = require("morgan");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");

// Load environment variables
dotenv.config();

// Loading SSL certificate and key
const sslOptions = {
  key: fs.readFileSync("./ssl/server.key"),
  cert: fs.readFileSync("./ssl/server.cert"),
};

// Importing routes
const authRoutes = require("./routes/auth");
const tenantRoutes = require("./routes/tenantRoutes");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const judgeRoutes = require("./routes/judgeRoutes");
const courtRoutes = require("./routes/courtRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const caseRoutes = require("./routes/caseRoutes");
const casePartyRoutes = require("./routes/casePartyRoutes");
const roleRoutes = require("./routes/roleRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const roleResourceRoutes = require("./routes/roleResourceRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");
const proceedingRoutes = require("./routes/proceedingRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const server = https.createServer(sslOptions, app);

// ------------------ MIDDLEWARE ------------------

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data

// Logging middleware for requests
// app.use(morgan("combined")); // Logs request details

// ------------------ API ROUTES ------------------

// Modularized route handlers
app.use("/auth", authRoutes);
app.use("/tenants", tenantRoutes);
app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/courts", courtRoutes);
app.use("/judges", judgeRoutes);
app.use("/categories", categoryRoutes);
app.use("/cases", caseRoutes);
app.use("/case_parties", casePartyRoutes);
app.use("/roles", roleRoutes);
app.use("/resources", resourceRoutes);
app.use("/roles_resources", roleResourceRoutes);
app.use("/users_roles", userRoleRoutes);
app.use("/proceedings", proceedingRoutes);

// ------------------ ERROR HANDLING ------------------

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handling middleware
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   res.status(status).json({
//     status: "error",
//     message: err.message || "Internal Server Error",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Shows stack trace in development mode
//   });
//   if (process.env.NODE_ENV !== "development") {
//     console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
//   }
// });

// ------------------ DATABASE SYNC ------------------

// Sync models with the database
// sequelize
//   .sync({ alter: true }) // Choose between 'alter' or 'force' depending on your use case
//   .then(() => {
//     console.log("Database synced successfully!");
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//     process.exit(1); // Exit process if database connection fails
//   });

// ------------------ SERVER STARTUP ------------------

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`HTTPS server running at https://localhost:${PORT}`);
});
