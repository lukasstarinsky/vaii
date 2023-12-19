import express from "express";
import * as User from "../controllers/user";
import * as Check from "../middleware/permissions";

const router = express.Router();

router.route("/:userId/profile")
      .all(Check.IsLoggedIn)
      .get(User.GetProfile);

export default router;