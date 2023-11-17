import express from "express";
import * as Auth from "../controllers/auth";

const router = express.Router();

router.get("/check", Auth.Check);
router.post("/login", Auth.Login);
router.post("/register", Auth.Register);

export default router;