import { Request, Response, NextFunction } from "express";
import { Thread, ThreadDocument } from "../models/Thread";
import { body, validationResult } from "express-validator";
import { UserDocument } from "../models/User";

const validCategories = ["news", "general", "media"];

export async function Summary(req: Request, res: Response, next: NextFunction) {
    try {
        let summary: any = {};
        for (let category of validCategories) {
            const threadCount = await Thread.countDocuments({ category });
            const lastThread = (await Thread.find({ category }).sort({ createdAt: -1 }).limit(1).populate("author")).at(0);

            if (threadCount === 0) {
                summary[category] = { threadCount };
                continue;
            }

            const author = lastThread!.author as unknown as UserDocument;
            summary[category] = {
                threadCount,
                lastThread: {
                    id: lastThread!.id,
                    title: lastThread!.title,
                    createdAt: lastThread!.createdAt,
                    author: author.username
                }
            };
        }

        res.status(200).send(summary);
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