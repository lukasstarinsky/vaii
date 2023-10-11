import express from "express";

const app = express();

import * as Routes from "./routes";
app.use("/auth", Routes.Auth);
//app.use("/forum", Routes.Forum);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});