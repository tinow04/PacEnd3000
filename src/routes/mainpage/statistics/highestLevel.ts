import {Request, Response} from "express";
import {db} from "../../../db/db";
import router from "../leaderboard";

interface queryResult {
    highest_level: number;
}

router.get('/api/homepage/statistics/highestlevel', async (req: Request, res: Response) => {
    const playerID = req.query.playerId;

    try {
        const result = await db.query<queryResult>(
            'SELECT MAX(levels_won) + 1 AS highest_level FROM scores WHERE player_id = $1;',
            [playerID]
        );
        console.log(result.rows[0].highest_level);
        res.status(200).json(result.rows[0].highest_level);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
    }
});

export default router;