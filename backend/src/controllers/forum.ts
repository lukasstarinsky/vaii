import { Request, Response, NextFunction } from "express";
import { Thread } from "../models/Thread";
import { Post } from "../models/Post";
import { body, validationResult } from "express-validator";
import { UserDocument } from "../models/User";
import mongoose from "mongoose";

const validCategories = ["news", "general", "media"];

export async function Summary(req: Request, res: Response, next: NextFunction) {
    try {
        let summary: any = {};
        for (let category of validCategories) {
            const threadCount = await Thread.countDocuments({ category });
            const lastThread = (await Thread.find({ category }).sort({ createdAt: -1 }).limit(1).populate("author", "username")).at(0);

            if (threadCount === 0) {
                summary[category] = { threadCount };
                continue;
            }

            summary[category] = {
                threadCount,
                lastThread
            };
        }

        res.status(200).send(summary);
    } catch (err: any) {
        next(err);
    }
}

export async function GetThreads(req: Request, res: Response, next: NextFunction) {
    try {
        if (!validCategories.includes(req.params.category))
            return res.status(400).send("Invalid category selected.");

        const threads = await Thread.find({ category: req.params.category }).sort({ createdAt: -1 }).populate("author", "username");
        res.status(200).send(threads);
    } catch (err: any) {
        next(err);
    }
}

export async function GetThread(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.threadId))
            return res.status(404).send("Thread not found.");

        const thread = await Thread.findById(req.params.threadId).populate("author", "username").populate({
            path: "post",
            select: "author text",
            populate: {
                path: "author",
                select: "username"
            }
        });
        if (!thread)
            return res.status(404).send("Thread not found.");

        res.status(200).send(thread);
    } catch (err: any) {
        next(err);
    }
}

export async function CreateThread(req: Request, res: Response, next: NextFunction) {
    try {
        await body("title")
            .notEmpty().withMessage("Title is required.")
            .if(body("title").notEmpty())
            .isLength({ min: 4 }).withMessage("Title must be atleast 4 characters long.").run(req);
        await body("description")
            .notEmpty().withMessage("Description is required.")
            .if(body("description").notEmpty())
            .isLength({ min: 32 }).withMessage("Description must be atleast 16 characters long.").run(req);
        
        const category = req.params.category || "none";
        const errors: string[] = validationResult(req).array().map(x => x.msg);

        if (!validCategories.includes(category))
            errors.push("Invalid category selected.");

        if (errors.length > 0)
            return res.status(400).send(errors);

        const { title, description } = req.body;
        const newPost = new Post({
            author: (req.user! as UserDocument).id,
            text: description
        });
        const post = await newPost.save();

        const newThread = new Thread({
            author: (req.user! as UserDocument).id,
            post: post.id,
            title,
            category
        });
        await newThread.save();

        res.status(201).send(newThread.id);
     } catch (err: any) {
        next(err);
    }
}

export async function DeleteThread(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.threadId))
            return res.status(404).send("Thread not found.");

        const deleted = await Thread.findByIdAndDelete(req.params.threadId);
        if (deleted)
            res.status(200).send("Thread deleted.");
        else
            res.status(404).send("Thread not found.");
    } catch (err: any) {
        next(err);
    }
}

export async function UpdatePost(req: Request, res: Response, next: NextFunction) {
    try {
        await body("text")
            .notEmpty().withMessage("Text of the post is required.")
            .if(body("text").notEmpty())
            .isLength({ min: 32 }).withMessage("Text of the post must be atleast 32 characters long.").run(req);

        const errors: string[] = validationResult(req).array().map(x => x.msg);
        if (errors.length > 0)
            return res.status(400).send(errors);

        if (!mongoose.isValidObjectId(req.params.postId))
            return res.status(404).send("Post not found.");

        const post = await Post.findById(req.params.postId);
        if (!post)
            return res.status(404).send("Post not found.");

        const update = { text: req.body.text };
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { $set: update }, { new: true }).populate("author", "username");

        return res.status(200).send(updatedPost);
    } catch (err: any) {
        next(err);
    }
}