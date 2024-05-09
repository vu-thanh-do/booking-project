import express from "express";
import { roomController } from "../controllers/room.js";
const router = express.Router();

router.get("/getall-room", roomController.getALlRoom);


export default router;
