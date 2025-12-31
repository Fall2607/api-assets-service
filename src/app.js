import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import assetRoutes from "./routes/asset.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";

dotenv.config();

const app = express();

// ✅ MUST be before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    origin: "http://192.168.1.72:5173",
  })
);

app.use(express.json());

app.use("/api/assets", assetRoutes);
app.use("/api/maintenance", maintenanceRoutes);

app.get("/", (req, res) => {
  res.send("Asset Service API running");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
