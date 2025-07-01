import {Request, Response} from "express";
import {db} from "../../../db/db";
import router from "../leaderboard";

interface queryResult {
    total_ghosts_eaten: number;
}

router.get('/api/homepage/statistics/totalghostseaten', async (req: Request, res: Response) => {
    const playerID = req.query.playerId;

    try {
        const result = await db.query<queryResult>(
            'SELECT SUM(ghosts_eaten) AS total_ghosts_eaten FROM scores WHERE player_id = $1;',
            [playerID]
        );
        console.log(result.rows[0].total_ghosts_eaten);
        res.status(200).json(result.rows[0].total_ghosts_eaten);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
    }
});

export default router;