import express from "express";
import { syncDepartments } from "../controllers/sync.controller.js";

const router = express.Router();

// INTERNAL ONLY
router.post("/sync/departments", syncDepartments);

export default router;
