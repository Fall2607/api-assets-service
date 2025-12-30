import express from "express";
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.post("/", createAsset);
router.get("/", getAssets);
router.get("/:id", getAssetById);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

export default router;
