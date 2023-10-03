import express, { Request, Response } from "express";

const app = express();

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});