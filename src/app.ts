import express from "express";
import cors from "cors"
import loginRouter from "./routes/login"
import registerRouter from "./routes/register"
import gameoverRouter from "./routes/gameover"
import mainpageRouter from "./routes/mainpage/leaderboard";
import skinRouter from "./routes/skin";
import shopRouter from "./routes/shop"
import profileRouter from "./routes/profile";
import highscoreRouter from "./routes/mainpage/statistics/highscore"
import lastScoreRouter from "./routes/mainpage/statistics/lastScore";
import gamesPlayedRouter from "./routes/mainpage/statistics/gamesPlayed";
import highestLevelRouter from "./routes/mainpage/statistics/highestLevel";
import totalPlayTimeRouter from "./routes/mainpage/statistics/totalPlayTime";
import totalGhostsEatenRouter from "./routes/mainpage/statistics/totalGhostsEaten";

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173'}))

app.use(loginRouter);
app.use(registerRouter);
app.use(gameoverRouter);
app.use(mainpageRouter)
app.use(shopRouter);
app.use(skinRouter);
app.use(profileRouter);
app.use(highscoreRouter);
app.use(lastScoreRouter);
app.use(gamesPlayedRouter);
app.use(highestLevelRouter);
app.use(totalPlayTimeRouter);
app.use(totalGhostsEatenRouter);

app.get("/", (_, res) => {
    res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");