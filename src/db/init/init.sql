CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password, email) VALUES
            ('PixelWarrior', 'secret1', 'pixelwarrior@example.com'),
            ('GhostHunter99', 'secret2', 'ghosthunter99@example.com'),
            ('ChompMaster', 'secret3', 'chompmaster@example.com'),
            ('MazeRunnerX', 'secret4', 'mazerunnerx@example.com'),
            ('PowerPelletPro', 'secret5', 'powerpelletpro@example.com'),
            ('DotMuncher', 'secret6', 'dotmuncher@example.com'),
            ('FruitSnatcher', 'secret7', 'fruitsnatcher@example.com'),
            ('PacChamp', 'secret8', 'pacchamp@example.com'),
            ('LevelUpLenny', 'secret9', 'leveluplenny@example.com'),
            ('GhostDodger', 'secret10', 'ghostdodger@example.com'),
            ('CherryChaser', 'secret11', 'cherrychaser@example.com'),
            ('TunnelTactician', 'secret12', 'tunneltactician@example.com'),
            ('SpeedySprite', 'secret13', 'speedysprite@example.com'),
            ('WakaWakaMan', 'secret14', 'wakawakamn@example.com'),
            ('PillCollector', 'secret15', 'pillcollector@example.com');

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
            (5, 1400, 7, 3, 112),
            (2, 1980, 11, 4, 160),
            (4, 2200, 15, 5, 190),
            (5, 1150, 5, 2, 88),
            (6, 1340, 6, 3, 100),
            (6, 1870, 10, 4, 143),
            (7, 2450, 14, 5, 200),
            (8, 990, 5, 2, 90),
            (8, 1580, 9, 3, 130),
            (9, 1210, 6, 3, 105),
            (10, 2655, 18, 6, 212),
            (10, 1430, 7, 3, 117),
            (11, 1720, 8, 4, 150),
            (12, 1600, 10, 3, 140);

CREATE TABLE shop (
            player_id INTEGER REFERENCES users(id),
            coins INT
);

INSERT INTO shop (player_id, coins) VALUES
            (1, 1200421),
            (2, 5714),
            (3, 234),
            (4, 8972),
            (5, 5),
            (6, 1500),
            (7, 32000),
            (8, 785),
            (9, 11990),
            (10, 602),
            (11, 43000),
            (12, 104);
