import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { User } from "../models/User";
import { Thread } from "../models/Thread";
import { Post } from "../models/Post";

export async function GetProfile(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.userId))
            return res.status(404).send("User not found.");

        const user = await User.findById(req.params.userId, "username avatar role createdAt");
        if (!user)
            return res.status(404).send("User not found.");

        const threadCount = await Thread.countDocuments({ author: req.params.userId });
        const postCount = await Post.countDocuments({ author: req.params.userId });
        const banCount = 0;

        res.status(200).send({ ...(user as any)._doc, threadCount, postCount, banCount });
    } catch (err: any) {
        next(err);
    }
}