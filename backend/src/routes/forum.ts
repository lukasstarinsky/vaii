import express from "express";
import * as Forum from "../controllers/forum";

const router = express.Router();

router.get("/", Forum.Summary);

router.route("/:category")
      .get(/*Forum.GetThreads*/)
      .post(Forum.CreateThread);

export default router;