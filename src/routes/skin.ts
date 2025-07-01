import {Request, Response, Router} from "express";
import {db} from "../db/db";


const router = Router();

    interface SkinResult {
        unlocked: boolean | null;
    }

interface SkinRequestBody {
    playerID: number;
    skinID: number;
}

router.get('/api/skin', async (req: Request, res: Response) => {
    const playerID = req.query.playerID;
    const skinID = req.query.skinID;
    if (!playerID || !skinID) {
        res.status(400).json({ message: 'playerID oder skinID fehlt' });
        return;
    } else {
        try {
            if (typeof skinID !== 'string') {
                res.status(400).json({ message: 'Ungültige skinID' });
                return;
            }
            console.log(skinID);
            const skin = `skin_${skinID}`;
            const query = `SELECT ${skin} AS unlocked FROM shop WHERE player_id = $1`;
            const result = await db.query<SkinResult>(
                query, [playerID]
            );
            res.status(200).json(result.rows[0].unlocked);
            console.log('Skin für playerID', playerID, 'und skinID', skinID, ':', result.rows[0].unlocked);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Fehler beim Abrufen der Daten.' });
        }
    }
});

router.post('/api/skin', async (req: Request<unknown, unknown, SkinRequestBody>, res: Response) => {
    const { playerID, skinID} = req.body;
    if (!playerID || !skinID) {
        res.status(400).json({ message: 'playerID oder skinID fehlt.' });
        return;
    } else {
        try {
            const column = `skin_${skinID}`;
            const query = `UPDATE shop SET ${column} = TRUE WHERE player_id = $1`;
            await db.query(query, [playerID]);
            res.status(200).json({ message: 'Skin erfolgreich freigeschalten.' });
            console.log('Skin', skinID, 'für playerID', playerID, 'freigeschalten.');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Skin konnte nicht freigeschalten werden.' });
        }
    }
});



export default router;
