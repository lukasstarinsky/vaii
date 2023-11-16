import passportLocal from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { User, UserDocument } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user)
            return done(undefined, false, { message: "Invalid username or password." });

        const match = await bcrypt.compare(password, user.password);
        if (match)
            return done(undefined, user);
        else
            return done(undefined, false, { message: "Invalid username or password. "});
    } catch (err: any) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, (user as UserDocument).id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(undefined, user);
    } catch (err: any) {
        done(err);
    }
});