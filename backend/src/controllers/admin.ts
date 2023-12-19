import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import { User, UserDocument } from "../models/User";
import { Thread } from "../models/Thread";
import { Post } from "../models/Post";
import { Ban } from "../models/Ban";

export async function GetAdminData(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await User.find({}, "-password");
        const threads = await Thread.find({}).populate("author", "-password");

        res.status(200).send({ users, threads });
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