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
            time_played INT,
            played_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO scores (player_id, points, ghosts_eaten, levels_won, pills_swallowed, time_played) VALUES
            (1, 1520, 9, 3, 120, 0),
            (1, 2100, 13, 5, 180, 0),
            (2, 970, 6, 2, 95, 0),
            (3, 2650, 17, 6, 205, 0),
            (3, 1100, 7, 3, 103, 0),
            (4, 1750, 8, 4, 145, 0),
            (5, 1400, 7, 3, 112, 0),
            (2, 1980, 11, 4, 160, 0),
            (4, 2200, 15, 5, 190, 0),
            (5, 1150, 5, 2, 88, 0),
            (6, 1340, 6, 3, 100, 0),
            (6, 1870, 10, 4, 143, 0),
            (7, 2450, 14, 5, 200, 0),
            (8, 990, 5, 2, 90, 0),
            (8, 1580, 9, 3, 130, 0),
            (9, 1210, 6, 3, 105, 0),
            (10, 2655, 18, 6, 212, 0),
            (10, 1430, 7, 3, 117, 0),
            (11, 1720, 8, 4, 150, 0),
            (12, 1600, 10, 3, 140, 0);

CREATE TABLE shop (
            player_id INTEGER REFERENCES users(id),
            coins INT,
            skin_1 BOOLEAN DEFAULT TRUE,
            skin_2 BOOLEAN DEFAULT FALSE,
            skin_3 BOOLEAN DEFAULT FALSE,
            skin_4 BOOLEAN DEFAULT FALSE,
            skin_5 BOOLEAN DEFAULT FALSE,
            skin_6 BOOLEAN DEFAULT FALSE,
            skin_7 BOOLEAN DEFAULT FALSE,
            skin_8 BOOLEAN DEFAULT FALSE,
            skin_9 BOOLEAN DEFAULT FALSE,
            skin_10 BOOLEAN DEFAULT FALSE,
            skin_11 BOOLEAN DEFAULT FALSE,
            skin_12 BOOLEAN DEFAULT FALSE,
            skin_13 BOOLEAN DEFAULT FALSE,
            skin_14 BOOLEAN DEFAULT FALSE,
            skin_15 BOOLEAN DEFAULT FALSE
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
