import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import { User, UserDocument, UserRole } from "../models/User";
import { Thread } from "../models/Thread";
import { Ban } from "../models/Ban";
import { Post } from "../models/Post";

export async function GetAdminData(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await User.find({}, "-password");
        const bans = await Ban.find({}).populate("from", "-password").populate("user", "-password");
        const threads = await Thread.find({}).populate("author", "-password");

        res.status(200).send({ users, threads, bans });
    } catch (err: any) {
        next(err);
    }
}

export async function BanUser(req: Request, res: Response, next: NextFunction) {
    try {
        await body("reason")
            .notEmpty().withMessage("Reason is required.")
            .if(body("reason").notEmpty())
            .isLength({ min: 8 }).withMessage("Reason must be atleast 8 characters long.").run(req);
        await body("hours")
            .notEmpty().withMessage("Length is required.")
            .if(body("hours").notEmpty())
            .isNumeric().withMessage("Length of the ban must be a number in hours.").run(req);

        const errors: string[] = validationResult(req).array().map(x => x.msg);
        if (errors.length > 0)
            return res.status(400).send(errors);

        if (!mongoose.isValidObjectId(req.params.userId)) {
            return res.status(404).send(["User not found."]);
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send(["User not found."]);
        }

        const bans = await Ban.find({ user: user.id });
        for (let ban of bans) {
            if (ban.dateTo > new Date()) {
                return res.status(400).send(["User is already banned."]);
            }
        }

        const { reason, hours } = req.body;
        const dateTo = new Date();
        dateTo.setTime(dateTo.getTime() + hours * 60 * 60 * 1000);

        const ban = new Ban({
            from: (req.user as UserDocument).id,
            user: user.id,
            reason,
            dateTo
        });
        await ban.save();

        res.status(200).send(["User banned."]);
    } catch (err: any) {
        next(err);
    }
}

export async function PromoteUser(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.userId)) {
            return res.status(404).send(["User not found."]);
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send(["User not found."]);
        }
        user.role = user.role != UserRole.ADMINISTRATOR ? UserRole.MODERATOR : user.role;
        await user.save();

        res.status(200).send(["User promoted to moderator."]);
    } catch (err: any) {
        next(err);
    }
}

export async function DeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.userId)) {
            return res.status(404).send("User not found.");
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }
        await user.deleteOne();
        await Post.deleteMany({ author: user.id });
        await Ban.deleteMany({ user: user.id });
        await Thread.deleteMany({ author: user.id });

        res.status(200).send(["User deleted."]);
    } catch (err: any) {
        next(err);
    }
}

export async function EditBan(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.banId)) {
            return res.status(404).send(["Ban not found."]);
        }

        const ban = await Ban.findById(req.params.banId);
        if (!ban) {
            res.status(404).send("Ban not found.");
        }
        
        const { newReason } = req.body;
        ban!.reason = newReason;
        await ban!.save();

        res.status(200).send("Ban edited.");
    } catch (err: any) {
        next(err);
    }
}

export async function RevokeBan(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.banId)) {
            return res.status(404).send(["Ban not found."]);
        }

        const ban = await Ban.findById(req.params.banId);
        if (!ban) {
            res.status(404).send("Ban not found.");
        }
        await ban!.deleteOne();

        res.status(200).send("Ban revoked.");
    } catch (err: any) {
        next(err);
    }
}