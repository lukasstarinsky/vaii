import { Request, Response, NextFunction } from "express";
import { Thread } from "../models/Thread";
import { body, validationResult } from "express-validator";
import { UserDocument } from "../models/User";

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

        if (!["news", "general", "media"].includes(category))
            errors.push("Invalid category selected.");

        if (errors.length > 0)
            return res.status(400).send(errors);

        const { title, description } = req.body;
        const newThread = new Thread({
            author: (req.user! as UserDocument).id,
            title,
            description 
        });
        await newThread.save();

        res.status(201).send(newThread.id);
     } catch (err: any) {
        next(err);
    }
}