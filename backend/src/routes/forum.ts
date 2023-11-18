import express from "express";
import * as Forum from "../controllers/forum";

const router = express.Router();

router.post("/:category", Forum.CreateThread);

export default router;