import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserDocument } from "../models/User";
import { IVerifyOptions } from "passport-local";
import { body, validationResult } from "express-validator";

export async function Login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err)
            return next(err);
        else if (!user)
            return res.status(404).send(info.message);

        req.logIn(user, (err) => {
            if (err)
                return next(err);

            return res.status(200).json({
                id: user.id,
                username: user.username,
            });
        });
    })(req, res, next);
}

export async function Register(req: Request, res: Response, next: NextFunction) {
    try {
        await body("username")
            .notEmpty().withMessage("Username is required")
            .if(body("username").notEmpty())
            .isLength({ min: 4 }).withMessage("Username must be at least 4 characters long.").run(req);
        await body("email")
            .notEmpty().withMessage("Email is required.")
            .if(body("email").notEmpty())
            .isEmail().withMessage("Email is invalid").run(req);
        await body("password")
            .notEmpty().withMessage("Password is required.")
            .if(body("password").notEmpty())
            .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long.").run(req);
        await body("passwordRepeat", "Passwords do not match.").equals(req.body.password).run(req);

        const validation = validationResult(req);

        if (!validation.isEmpty())
            return res.status(400).send({ errors: validationResult(req).array().map(x => x.msg) });

        // Todo register x)
    } catch (err: any) {
        next(err);
    }
}