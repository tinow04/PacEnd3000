import express from "express";
import cors from "cors"
import loginRouter from "./routes/login"

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173'}))

app.use(loginRouter);

app.get("/", (_, res) => {
    res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");