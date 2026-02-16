--Users (customers)
--Movies
--Screenings / showtimes
--Seats
--Reservations
--Payments
BEGIN;
DROP  TABLE IF EXISTS reservation_seat;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS screenings;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

DROP TYPE payment_type;
DROP TYPE payment_status;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP  DEFAULT NOW()
);


--Ֆիլմի ինֆորմացիա է
CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    duration_minutes  INTEGER NOT NULL,
    rating TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


--Ֆիլմի կոնկրետ ցուցադրությունն է
CREATE TABLE screenings(
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    hall_name  TEXT NOT NULL,
    price NUMERIC(8,2)NOT NULL -- 8 tiv storaketic het 2 tiv 123456.78:
);


--Որ կոնկրետ տեղն է զբաղված
--Որ տեղն է ազատ
CREATE TABLE seats(
    id SERIAL PRIMARY KEY,
    screening_id INTEGER NOT NULL REFERENCES screenings(id) ON DELETE CASCADE,
    row_number INTEGER NOT NULL,
    seat_number INTEGER NOT NULL,
    UNIQUE (screening_id, row_number, seat_number)
);


--ամրագրում
CREATE TABLE reservations(
    id SERIAL PRIMARY KEY, 
    user_id INTEGER  REFERENCES users(id) ON DELETE CASCADE,
    screening_id INTEGER NOT NULL REFERENCES screenings(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at  TIMESTAMP DEFAULT NOW(),
    CHECK (status IN ('pending','confirmed', 'cancelled'))--paymeny entacki mej e , hastatvac e , hetadzgvac e :
);

CREATE TABLE reservation_seat(
    reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
    seat_id INTEGER REFERENCES seats(id) ON DELETE CASCADE,
    PRIMARY KEY (reservation_id, seat_id)
    );

CREATE TYPE payment_type AS ENUM('card', 'idram', 'arca');
CREATE TYPE payment_status AS ENUM('pending','confirmed', 'cancelled');

CREATE TABLE payments(
    id SERIAL PRIMARY KEY,
    reservation_id  INTEGER UNIQUE  REFERENCES reservations(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method payment_type NOT NULL,
    status  payment_status DEFAULT 'pending',
    paid_at TIMESTAMP
    
);
COMMIT;