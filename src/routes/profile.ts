// backend/routes/profile.ts

import { Request, Response, Router } from 'express';
import { db } from '../db/db';

const router = Router();

//
// GET /api/profile?playerID=...
// Liefert { username } oder einen Fehler
//
interface ProfileQuery {
    playerID?: string;
}
interface ProfileResponse {
    username: string;
}
interface ErrorResponse {
    message: string;
}

router.get(
    '/api/profile',
    async (
        req: Request<        // <Params, ResBody, ReqBody, ReqQuery>
            unknown,
            ProfileResponse | ErrorResponse,
            unknown,
            ProfileQuery
        >,
        res: Response<ProfileResponse | ErrorResponse>
    ): Promise<void> => {
        const playerID = req.query.playerID;
        if (!playerID) {
            res.status(400).json({ message: 'playerID fehlt.' });
            return;
        }

        try {
            const result = await db.query<ProfileResponse>(
                'SELECT username FROM users WHERE id = $1;',
                [playerID]
            );
            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Benutzer nicht gefunden.' });
                return;
            }
            res.status(200).json({ username: result.rows[0].username });
        } catch (error) {
            console.error('DB-Error profile GET:', error);
            res.status(500).json({ message: 'Fehler beim Abrufen der Benutzerdaten.' });
        }
    }
);

//
// POST /api/logout
// Führt Logout durch (Session/Cookie invalidieren etc.)
//
interface LogoutBody {
    playerID?: number;
}

router.post(
    '/api/logout',
    (
        req: Request<unknown, ErrorResponse, LogoutBody>,
        res: Response<ErrorResponse>
    ): void => {
        const { playerID } = req.body;
        console.log('Logout für playerID', playerID);
        // TODO: hier ggf. Session löschen oder Cookie invalidieren
        res.status(200).json({ message: 'Abmeldung erfolgreich.' });
    }
);

export default router;
