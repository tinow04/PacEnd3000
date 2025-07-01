import {Request, Response} from "express";
import {db} from "../../../db/db";
import router from "../leaderboard";

interface queryResult {
    games_played: number;
}

router.get('/api/homepage/statistics/gamesplayed', async (req: Request, res: Response) => {
    const playerID = req.query.playerId;

    try {
        const result = await db.query<queryResult>(
            'SELECT COUNT(player_id) AS games_played FROM scores WHERE player_id = $1;',
            [playerID]
        );
        console.log(result.rows[0].games_played);
        res.status(200).json(result.rows[0].games_played);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
    }
});

export default router;