import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Config
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Routes
import * as Routes from "./routes";
app.use("/auth", Routes.Auth);
//app.use("/forum", Routes.Forum);

app.listen(port, async () => {
    console.log(`Server running at port ${port}`);

    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}`);
        console.log("Database connected");
    } catch (err: any) {
        console.error("Failed to connect to database.");
        console.error(err);
        process.exit(1);
    }
});