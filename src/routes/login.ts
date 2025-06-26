import { Request, Response, Router } from 'express';
import { db } from '../db/db';

const router: Router = Router();

interface User {
    id: number;
    username: string;
    password: string;
    createdAt: string;
}

interface LoginRequestBody {
    username: string;
    password: string;
}

router.post('/api/login', async (
    req: Request<unknown, unknown, LoginRequestBody>,
    res: Response
): Promise<void> => {
    const { username, password } = req.body;

    console.log(username, password);

    // Prüfe ob beide Felder vorhanden sind
    if (!username || !password) {
        res.status(400).json({ message: 'Fehlende Daten: Benutzername und Passwort erforderlich.' });
        return;
    }

    try {
        // Datenbankabfrage
        const result = await db.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        // Prüfe ob ein Nutzer gefunden wurde
        if (result.rowCount === 0) {
            res.status(401).json({ message: 'Ungültige Anmeldedaten' });
            return;
        }

        // Login erfolgreich
        const user: User = result.rows[0];
        res.status(200).json({
            message: 'Login erfolgreich',
            user,

        })
        console.log(user);

    } catch (error) {
        console.error('DB-Fehler beim Login:', error);
        res.status(500).json({ message: 'Fehler beim Zugriff auf die Datenbank.' });
    }
});

export default router;
