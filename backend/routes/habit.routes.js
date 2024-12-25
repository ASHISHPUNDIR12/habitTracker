import express from "express";
import {
  createHabit,
  deleteHabit,
  getHabit,
  updateHabit,
} from "../controllers/habit.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/", protectRoute, getHabit);
router.post("/", protectRoute, createHabit);
router.put("/:id", protectRoute, updateHabit);
router.delete("/:id", protectRoute, deleteHabit);

export default router;
