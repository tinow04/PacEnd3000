import {Request, Response} from "express";
import {db} from "../../../db/db";
import router from "../leaderboard";

interface queryResult {
    score: number;
}

router.get('/api/homepage/statistics/lastscore', async (req: Request, res: Response) => {
    const playerID = req.query.playerId;

    try {
        const result = await db.query<queryResult>(
            'SELECT points AS score FROM scores WHERE player_id = $1 ORDER BY played_at DESC LIMIT 1;',
            [playerID]
        );
        console.log(result.rows[0].score);
        res.status(200).json(result.rows[0].score);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
    }
});

export default router;