import { Request, Response, NextFunction } from "express";
import { Thread, ThreadDocument } from "../models/Thread";
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

        const thread = await Thread.findById(req.params.threadId).populate("author", "username");

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
            .isLength({ min: 16 }).withMessage("Description must be atleast 16 characters long.").run(req);
        
        const category = req.params.category || "none";
        const errors: string[] = validationResult(req).array().map(x => x.msg);

        if (!validCategories.includes(category))
            errors.push("Invalid category selected.");

        if (errors.length > 0)
            return res.status(400).send(errors);

        const { title, description } = req.body;
        const newThread = new Thread({
            author: (req.user! as UserDocument).id,
            title,
            category,
            description 
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

export async function UpdateThread(req: Request, res: Response, next: NextFunction) {
    try {
        if (!mongoose.isValidObjectId(req.params.threadId))
            return res.status(404).send("Thread not found.");

        const thread = await Thread.findById(req.params.threadId);
        if (!thread)
            return res.status(404).send("Thread not found.");
        /* else if // Todo check admin rights/author */

        let update: any = {};
        if (req.body.title)
            update["title"] = req.body.title;
        if (req.body.description)
            update["description"] = req.body.description;
        if (req.body.category) {
            if (validCategories.includes(req.body.category))
                update["category"] = req.body.category;
        }

        await thread.updateOne({ $set: update });
        return res.status(200).send("Thread updated.");
    } catch (err: any) {
        next(err);
    }
}