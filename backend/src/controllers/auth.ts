import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User, UserDocument } from "../models/User";
import { IVerifyOptions } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Ban } from "../models/Ban";

export async function Check(req: Request, res: Response, next: NextFunction) {
    if (!req.user)
        return res.status(401).send("Unauthorized.");

    const bans = await Ban.find({ user: (req.user as UserDocument).id });
    for (let ban of bans) {
        if (ban.dateTo > new Date()) {
            return res.status(401).send("Unauthorized."); 
        }
    }
    
    res.status(200).send({
        id: (req.user as UserDocument).id,
        username: (req.user as UserDocument).username,
        role: (req.user as UserDocument).role
    });
}

export async function Login(req: Request, res: Response, next: NextFunction) {
    await body("username").notEmpty().withMessage("Username is required.").run(req);
    await body("password").notEmpty().withMessage("Password is required.").run(req);

    const validation = validationResult(req);
    if (!validation.isEmpty())
        return res.status(400).send(validation.array().map(x => x.msg));

    passport.authenticate("local", async (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err)
            return next(err);
        else if (!user)
            return res.status(400).send([ info.message ]);

        const bans = await Ban.find({ user: user.id });
        for (let ban of bans) {
            if (ban.dateTo > new Date()) {
                return res.status(400).send([`This user is banned until ${new Date(ban.dateTo).toLocaleString()} for reason: ${ban.reason}.`]);
            }
        }

        req.logIn(user, (err) => {
            if (err)
                return next(err);

            return res.status(200).json({
                id: user.id,
                username: user.username,
                role: user.role
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

        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        let errors: string[] = validationResult(req).array().map(x => x.msg);

        if (existingUser)
            errors.push("User with this username/email already exists.");

        if (errors.length > 0)
            return res.status(400).send(errors);

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            password: hash,
            email
        });
        await newUser.save();
        res.status(201).send("Account created.");
    } catch (err: any) {
        next(err);
    }
}

export function Logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
        if (err)
            return next(err);

        return res.status(200).json({});
    });
}