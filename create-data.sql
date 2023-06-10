CREATE ROLE program WITH PASSWORD 'test';
ALTER ROLE program WITH LOGIN;

CREATE DATABASE learns;
CREATE DATABASE cards;
CREATE DATABASE users;
CREATE DATABASE statistics;

\c postgres
GRANT ALL PRIVILEGES ON DATABASE learns TO program;
GRANT ALL PRIVILEGES ON DATABASE cards TO program;
GRANT ALL PRIVILEGES ON DATABASE users TO program;
GRANT ALL PRIVILEGES ON DATABASE statistics TO program;

\c cards
CREATE TABLE categories
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(255) NOT NULL
);
CREATE TABLE sets
(
    id          SERIAL PRIMARY KEY,
    set_uid     uuid UNIQUE NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    level       VARCHAR(20) NOT NULL
        CHECK (level IN ('EASY', 'MEDIUM', 'HARD')),
    category_id INT NOT NULL,
    username    VARCHAR(255) NOT NULL
);
CREATE TABLE flashcards
(
    id          SERIAL PRIMARY KEY,
    word        VARCHAR(255) NOT NULL,
    meaning     VARCHAR(255) NOT NULL,
    example     VARCHAR(255),
    set_id      INT NOT NULL
);

INSERT INTO categories(
    name)
    VALUES ('Greeting'),
            ('Animal'),
            ('Time');

INSERT INTO sets(
    set_uid, name, description, level, category_id, username)
    VALUES  ('e449eccb-fdbd-477c-b2ff-fcff6ac0d464', 'Greeting 1', 'Greetings in russian 1', 'EASY', 1, 'admin'),
            ('9aadb889-a825-4104-b2e4-3cd0869e5a62', 'Animal 1', 'Animals', 'MEDIUM', 2, 'admin'),
            ('daec2691-8ae3-4bc1-88b7-07d99f2a56eb', 'Time 1', 'Nouns of time', 'HARD', 3, 'admin'),
            ('a65e7a6f-984d-4834-a74c-62ae36d2adfc', 'Greeting 2', 'Greetings in russian 2', 'EASY', 1, 'test');

INSERT INTO flashcards(
    word, meaning, example, set_id)
    VALUES ('Здравствуйте', 'Hello', 'Здравствуйте! Меня зовут Алексей.', 1),
            ('Привет', 'Hi', 'Привет, Анна', 1),
            ('До свидания', 'Goodbye', 'До свидания и спасибо за подарок', 1),
            ('Пока', 'Bye', 'Пока, Дима', 1),
            ('Собака', 'Dog', 'Это моя собака', 2),
            ('Кошка', 'Cat', 'Смотри, какая красивая кошка', 2),
            ('Сегодня', 'Today', 'Сегодня мой день рождения', 3),
            ('Завтра', 'Tomorrow', 'Он придёт к нам завтра', 3),
            ('Спасибо', 'Thanks', 'До свидания и спасибо за подарок.', 4),
            ('Извините', 'Sorry', 'Извините за шум, Антон.', 4);

\c users
CREATE TABLE users
(
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    username    VARCHAR(255) NOT NULL,
    role        VARCHAR(20) NOT NULL DEFAULT 'USER'
        CHECK (role IN ('USER', 'ADMIN'))
);

INSERT INTO users(
    id, email, username, role)
    VALUES (1, 'admin@ya.ru', 'admin', 'ADMIN'),
           (2, 'test@mail.ru', 'test', 'USER');

\c learns;

CREATE TABLE histories
(
    id              SERIAL PRIMARY KEY,
    history_uid     uuid UNIQUE NOT NULL,
    set_uid         uuid NOT NULL,
    username        VARCHAR(255) NOT NULL,
    remember_rate   INT
        CHECK (remember_rate BETWEEN 0 AND 100),
    last_learn      TIMESTAMP,
    last_test       TIMESTAMP,
    notification    TIMESTAMP
);

INSERT INTO histories(
	id, history_uid, set_uid, username)
	VALUES (1, '83575e12-7ce0-48ee-9931-51919ff3c9ee', 'e449eccb-fdbd-477c-b2ff-fcff6ac0d464', 'test');

    
\c statistics;
CREATE TABLE statistics
(
    id          SERIAL PRIMARY KEY,
    date        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    method      VARCHAR(255),
    url         VARCHAR(255)
);

INSERT INTO statistics(
	method, url)
	VALUES ('GET', '/api/v1/set');