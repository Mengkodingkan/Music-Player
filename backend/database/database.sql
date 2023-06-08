-- users, playlists sub-queries
SELECT *
FROM users
WHERE id IN (SELECT user_id FROM playlists WHERE playlists.id < 3);

-- VIEW users full_name
CREATE VIEW users_full_name AS
SELECT id, full_name
FROM users;
SELECT *
FROM users_full_name;

-- SEQUENCES (auto-increment)
CREATE TABLE TestTable
(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);
INSERT INTO TestTable VALUES (NULL);

-- User Privileges
CREATE USER 'marleess'@'localhost' IDENTIFIED BY 'coba';
GRANT SELECT ON music_player.users TO 'marleess'@'localhost';
SELECT * FROM mysql.user;

-- REGEXP
SELECT * FROM users WHERE full_name REGEXP '^Mrs.';
