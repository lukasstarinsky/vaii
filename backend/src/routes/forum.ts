import express from "express";
import * as Forum from "../controllers/forum";
import * as Check from "../middleware/permissions";

const router = express.Router();

router.get("/", Forum.Summary);

router.route("/thread/:threadId")
      .all(Check.IsLoggedIn)
      .get(Forum.GetThread)
      .delete(Forum.DeleteThread)
      .post(/*Forum.CreatePost*/);

router.route("/post/:postId")
      .all(Check.IsLoggedIn)
      .patch(Forum.UpdatePost);

router.route("/category/:category")
      .all(Check.IsLoggedIn)
      .get(Forum.GetThreads)
      .post(Forum.CreateThread);

export default router;