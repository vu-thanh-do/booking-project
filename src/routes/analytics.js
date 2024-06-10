import express from "express";
import { analyticsController } from "../controllers/analytics.js";
const router = express.Router();
router.get("/get-analytics", analyticsController.getAllTotals);
router.get("/get-analytics-room/:id", analyticsController.getToTalIdRoom);

export default router;
