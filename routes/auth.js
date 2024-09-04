import { Router } from "express";
import { login, signup } from "../controller/auth.js";

export const router = Router();

router.post("/signup", signup);
router.post("/login", login);
