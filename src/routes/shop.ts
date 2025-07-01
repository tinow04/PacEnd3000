import {Request, Response, Router} from "express";
import {db} from "../db/db";


const router = Router();

interface CoinsResult {
    coins: number | null;
}

interface CoinsRequestBody {
    playerID: number;
    coins: number;
    price: number;
}

router.get('/api/shop', async (req: Request, res: Response) => {
    const playerID = req.query.playerID;
    if (!playerID) {
        res.status(400).json({ message: 'playerID fehlt.' });
        return;
    } else {
        try {
            const result = await db.query<CoinsResult>(
                'SELECT coins AS coins FROM shop WHERE player_id = $1;',
                [playerID]
            );
            res.status(200).json(result.rows[0].coins);
            console.log('Coins für playerID', playerID, ':', result.rows[0].coins);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
        }
    }
});

router.post('/api/shop', async (req: Request<unknown, unknown, CoinsRequestBody>, res: Response) => {
    const { playerID, coins, price} = req.body;
    if (!playerID || !coins || !price) {
        res.status(400).json({ message: 'playerID fehlt oder fehlende Daten.' });
        return;
    } else {
        const newCoins = coins - price;
        try {
            const result = await db.query<CoinsResult>(
                `UPDATE shop SET coins = $2 WHERE player_id = $1 RETURNING coins;`,
                 [playerID, newCoins]
            );
            res.status(200).json(result.rows[0].coins);
            console.log('Coins für playerID', playerID, ':', result.rows[0].coins);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
        }
    }
});



export default router;
