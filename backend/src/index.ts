import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
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

app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
const sessionMiddleware = session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        client: mongoose.connection.getClient(),
        collectionName: "sessions"
    }),
    cookie: {
        sameSite: "none",
        secure: false
    }
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

import * as Routes from "./routes";
app.use("/api/auth", Routes.Auth);
app.use("/api/forum", Routes.Forum);
app.use("/api/user", Routes.User);
app.use(express.static("public"));

// 404
app.use((req, res, next) => {
    return res.status(404).send("Not Found.");
});

// Errors
app.use((err: NativeError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res.status(500).send("Something went wrong.");
})

// Sockets
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./models/User";

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const wrapper = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {}, next);
io.use(wrapper(sessionMiddleware));

io.on("connection", async (socket) => {
    const user = await User.findById((socket.request as any).session.passport.user);
    console.log(`User '${user!.username}' connected.`);

    io.emit("new-message", {
        author: "SYSTEM",
        color: "text-gray-500",
        message: `User ${user!.username} joined the chat.`
    });

    socket.on("message", (message) => {
        if (message.length > 256) {
            socket.emit("new-message", {
                author: "SYSTEM",
                color: "text-red-500",
                message: "CANNOT SEND A MESSAGE LONGER THAN 256 CHARACTERS!"
            });
            return;
        }

        io.emit("new-message", {
            author: user!.username,
            message
        });
    });

    socket.on("disconnect", () => {
        console.log(`User '${user!.username}' disconnected.`);
    });
});

httpServer.listen(port, () => console.log(`Server running at port ${port}`));