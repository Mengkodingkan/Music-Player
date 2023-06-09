-- SELECT, INSERT, UPDATE, DELETE
SELECT * FROM users;
INSERT INTO users (email, password, full_name, image, role) VALUES ('test@mail.com', 'test', 'Test User', 'test.jpg', 'user');
UPDATE users SET full_name = 'Test User 2' WHERE id = 58;
DELETE FROM users WHERE id = 58;

-- SELECT WHERE, ORDER BY
SELECT * FROM users WHERE full_name LIKE '%Test%';
SELECT * FROM users WHERE full_name LIKE '%Test%' ORDER BY full_name ASC;

-- Case and Character Manipulation
SELECT full_name, UPPER(full_name) AS upper_name, LOWER(full_name) AS lower_name, CONCAT('Hello ', full_name) AS greeting FROM users;
SELECT full_name, SUBSTRING(full_name, 1, 4) AS first_name FROM users;
SELECT length(full_name) AS length_name FROM users;
SELECT INSTR(full_name, ' ') AS space_index FROM users;
SELECT TRIM('t' FROM full_name) AS trim_string, LPAD(full_name, 20, 'x') AS lpad_string, RPAD(full_name, 20, 'x') AS rpad_string FROM users;
SELECT REPLACE(full_name, ' ', '_') AS replace_string FROM users;
SELECT ROUND(id) AS round_id, MOD(id, 2) AS mod_id FROM users;

-- Join
SELECT * FROM users JOIN playlists ON users.id = playlists.user_id;

-- Group Functions
SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) AS total_users FROM users WHERE role = 'user';


-- sub-queries users, playlists
SELECT *
FROM users
WHERE id IN (SELECT user_id FROM playlists WHERE playlists.id < 5);

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
REVOKE SELECT ON music_player.users FROM 'marleess'@'localhost';

-- REGEXP
SELECT * FROM users WHERE full_name REGEXP '^Mrs.';
