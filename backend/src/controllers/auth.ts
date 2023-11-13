import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserDocument } from "../models/User";
import { IVerifyOptions } from "passport-local";

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
        })
    })(req, res, next);
}

export async function Register(req: Request, res: Response) {
    
}