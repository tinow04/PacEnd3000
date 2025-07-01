// src/routes/register.ts
import { Request, Response, Router } from "express";
import { db } from "../db/db";

const router = Router();

interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

interface RegisteredUser {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

router.post(
    "/api/register",
    async (
        req: Request<unknown, unknown, RegisterRequestBody>,
        res: Response
    ): Promise<void> => {
        const { username, email, password } = req.body;

        // Pflichtfelder prüfen
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Benutzername, Email und Passwort sind erforderlich.",
            });
            return;
        }

        try {
            // prüfen, ob schon vorhanden
            const exists = await db.query(
                "SELECT 1 FROM users WHERE email = $1 OR username = $2",
                [email, username]
            );
            if ((exists.rowCount ?? 0) > 0) {
                res.status(409).json({
                    message:
                        "Ein Nutzer mit dieser Email oder diesem Benutzernamen existiert bereits.",
                });
                return;
            }

            // neuen User anlegen
            const insertUser = await db.query<RegisteredUser>(
                `INSERT INTO users (username, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, username, email, created_at AS "createdAt"`,
                [username, email, password]
            );
            const newUser = insertUser.rows[0];

            await db.query(
                `INSERT INTO shop (player_id, coins)
         VALUES ($1, $2)`,
                [newUser.id, 0]
            );

            res.status(201).json({
                message: "Registrierung erfolgreich",
                user: newUser,
            });
            console.log("Neuer Nutzer:", newUser);
        } catch (err) {
            console.error("DB-Fehler bei der Registrierung:", err);
            res.status(500).json({ message: "Interner Serverfehler." });
        }
    }
);

export default router;
