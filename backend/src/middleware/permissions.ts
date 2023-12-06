import { Request, Response, NextFunction } from "express";
import { UserDocument, UserRole } from "../models/User";

export function IsLoggedIn (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}
  
export function IsStaff (req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Unauthorized");
    }
    
    const user = req.user as UserDocument;
    if (user.role == UserRole.ADMINISTRATOR || user.role == UserRole.MODERATOR) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}