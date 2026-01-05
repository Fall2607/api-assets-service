import express from "express";
import { getUnits, getUnitById } from "../controllers/unit.controller.js";

const router = express.Router();

// GET list unit (dropdown, filter)
router.get("/", getUnits);

// GET detail unit
router.get("/:id", getUnitById);

export default router;
