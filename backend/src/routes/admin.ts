import express from "express";
import * as Admin from "../controllers/admin";
import * as Check from "../middleware/permissions";

const router = express.Router();

router.route("/")
      .all(Check.IsAdmin)
      .get(Admin.GetAdminData);

router.route("/user/:userId/ban")
      .all(Check.IsAdmin)
      .patch(Admin.BanUser);

router.route("/ban/:banId")
      .all(Check.IsAdmin)
      .patch(Admin.EditBan)
      .delete(Admin.RevokeBan);

export default router;