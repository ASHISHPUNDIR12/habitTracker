import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/signUp", signUp);

export default router;
