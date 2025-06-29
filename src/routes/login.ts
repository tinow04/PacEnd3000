import { Request, Response, Router } from 'express';
import { db } from '../db/db';

const router: Router = Router();

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

router.post('/api/login', async (
    req: Request<unknown, unknown, LoginRequestBody>,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    console.log(email, password);
    console.log('Host:', process.env.DB_HOST);

    // Prüfe ob beide Felder vorhanden sind
    if (!email || !password) {
        res.status(400).json({ message: 'Fehlende Daten: Email und Passwort erforderlich.' });
        return;
    }

    try {
        // Datenbankabfrage
        const result = await db.query<User>(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        // Prüfe ob ein Nutzer gefunden wurde
        if (result.rowCount === 0) {
            res.status(401).json({ message: 'Ungültige Anmeldedaten' });
            return;
        }

        // Login erfolgreich
        const user = result.rows[0];
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

