import {Request, Response} from "express";
import {db} from "../../../db/db";
import router from "../leaderboard";

interface queryResult {
    timeplayed: number;
}

router.get('/api/homepage/statistics/totalplaytime', async (req: Request, res: Response) => {
    const playerID = req.query.playerId;

    try {
        const result = await db.query<queryResult>(
            'SELECT SUM(time_played) AS timeplayed FROM scores WHERE player_id = $1;',
            [playerID]
        );
        const formattedTime = formatTime(result.rows[0].timeplayed);

        console.log(formattedTime);
        res.status(200).json(formattedTime);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
    }
});

function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

export default router;