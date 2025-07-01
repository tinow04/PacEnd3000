import {Request, Response, Router} from "express";
import {db} from "../../db/db";

const router = Router();

let playerid: number;

interface leaderboardScore {
    player_id: number;
    points: number;
    score: number | null;
}

interface userDetail {
    username: string;
    name: string;
}

router.get('/api/homepage/leaderboard', async (req: Request, res: Response) => {
    const rankIDRaw = req.query.rankID;

    if (typeof rankIDRaw !== 'string') {
        res.status(400).json({ message: 'rankID fehlt oder ist ungültig.' });
        return;
    }
    const rankID = parseInt(rankIDRaw, 10);
    if (isNaN(rankID)) {
        res.status(400).json({ message: 'rankID ist keine gültige Zahl.' });
        return;
    }
    const rankIDMinusOne = rankID - 1;

    try {
        const resultPoints = await db.query<leaderboardScore>(
            'SELECT player_id, points FROM scores ORDER BY points DESC OFFSET $1 LIMIT 1;',
            [rankIDMinusOne]
        );

        playerid = resultPoints.rows[0].player_id;

        const resultUsername = await db.query<userDetail>(
            'SELECT username FROM users WHERE id = $1',
            [playerid]
        );
        res.status(200).json({ score: resultPoints.rows[0].points, name: resultUsername.rows[0].username });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
    }
});

export default router;