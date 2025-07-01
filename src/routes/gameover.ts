import { Request, Response, Router } from 'express';
import { db } from '../db/db';

const router = Router();

interface GameOverRequestBody {
    playerID: number;
    points: number;
    ghostsEaten: number;
    levelsWon: number;
    pillsSwallowed: number;
    timePlayed: number;
}

interface HighscoreResult {
  highscore: number | null; 
}

router.post('/api/gameover', async (req: Request<unknown, unknown, GameOverRequestBody>, res: Response) => {
    const { playerID, points, ghostsEaten, levelsWon, pillsSwallowed, timePlayed } = req.body;
    if (playerID !== null && playerID !== undefined &&
        points !== null && points !== undefined &&
        ghostsEaten !== null && ghostsEaten !== undefined &&
        levelsWon !== null && levelsWon !== undefined &&
        pillsSwallowed !== null && pillsSwallowed !== undefined &&
        timePlayed !== null && timePlayed !== undefined) {
        try {
            await db.query(
                'INSERT INTO scores (player_id, points, ghosts_eaten, levels_won, pills_swallowed, time_played) VALUES ($1, $2, $3, $4, $5, $6)',
                [playerID, points, ghostsEaten, levelsWon, pillsSwallowed, timePlayed]
            );
            await db.query(
                'UPDATE shop SET coins = coins + $1 WHERE player_id = $2',
                [points, playerID]
            );  
            res.status(200).json({ message: 'Daten empfangen und gespeichert.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Fehler beim Speichern in die Datenbank.' });
        }
    } else {
        res.status(400).json({ message: 'Fehlende Daten.' });
    }
});

router.get('/api/gameover', async (req: Request, res: Response) => {
    const playerID = req.query.playerID;
    if (!playerID) {
        res.status(400).json({ message: 'playerID fehlt.' });
        return;
    } else {
        try {
            const result = await db.query<HighscoreResult>(
                'SELECT MAX(points) AS highscore FROM scores WHERE player_id = $1;',
                [playerID]
            );
            res.status(200).json(result.rows[0].highscore);
            console.log('Highscore für playerID', playerID, ':', result.rows[0].highscore);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
        }
    }
});

export default router;
