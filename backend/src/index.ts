import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/passport";

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(`${process.env.MONGO_DB_URL}`)
    .then(() => console.log("Database connected"))
    .catch((err: any) => {
        console.error("Failed to connect to database.");
        console.error(err);
        process.exit(1);
    });

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        client: mongoose.connection.getClient(),
        collectionName: "sessions"
    })
}));
app.use(passport.initialize());
app.use(passport.session());

import * as Routes from "./routes";
app.use("/auth", Routes.Auth);

// 404
app.use((req, res, next) => {
    return res.status(404).send("Not Found.");
});

// Errors
app.use((err: NativeError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res.status(500).send("Something went wrong.");
})

app.listen(port, () => console.log(`Server running at port ${port}`));