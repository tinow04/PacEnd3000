CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password, email) VALUES
            ('PixelWarrior', 'secret1', 'pixelwarrior@example.com'),
            ('GhostHunter99', 'secret2', 'ghosthunter99@example.com'),
            ('ChompMaster', 'secret3', 'chompmaster@example.com'),
            ('MazeRunnerX', 'secret4', 'mazerunnerx@example.com'),
            ('PowerPelletPro', 'secret5', 'powerpelletpro@example.com');


CREATE TABLE scores (
            player_id INTEGER REFERENCES users(id),
            points INT,
            ghosts_eaten INT,
            levels_won INT,
            pills_swallowed INT,
            played_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO scores (player_id, points, ghosts_eaten, levels_won, pills_swallowed) VALUES
            (1, 1520, 9, 3, 120),
            (1, 2100, 13, 5, 180),
            (2, 970, 6, 2, 95),
            (3, 2650, 17, 6, 205),
            (3, 1100, 7, 3, 103),
            (4, 1750, 8, 4, 145),
            (5, 1400, 7, 3, 112);

CREATE TABLE coins (
            player_id INTEGER REFERENCES users(id),
            coins INT
);

INSERT INTO coins (player_id, coins) VALUES
            (1, 1200421),
            (2, 5714),
            (3, 234),
            (4, 8972),
            (5, 5);