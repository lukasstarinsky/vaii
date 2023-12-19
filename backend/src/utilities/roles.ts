import { UserDocument, UserRole } from "../models/User";

export function IsModerator(user: UserDocument) {
    return user.role == UserRole.ADMINISTRATOR || user.role == UserRole.MODERATOR;
}

export function IsAdmin(user: UserDocument) {
    return user.role == UserRole.ADMINISTRATOR;
}