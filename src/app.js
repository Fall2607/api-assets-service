import express from "express";
import dotenv from "dotenv";
import assetRoutes from "./routes/asset.routes.js";

dotenv.config();

const app = express();

// Allow JSON body
app.use(express.json());

// Routes
app.use("/api/assets", assetRoutes);

app.get("/", (req, res) => {
  res.send("Asset Service API running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
