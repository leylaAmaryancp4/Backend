BEGIN;

INSERT INTO users(full_name, email) VALUES
( 'Alice Smith', 'alice@example.com'),
( 'Bob Johnson', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
( 'Diana Prince', 'diana@example.com'),
( 'Eve Adams', 'eve@example.com'),       
( 'Frank Miller', 'frank@example.com'),
( 'Grace Lee', 'grace@example.com'),
( 'Henry Ford', 'henry@example.com')
RETURNING id;   


INSERT INTO movies(title, duration_minutes, rating) VALUES
('Interstellar', 169, 'PG-13'),
('Dune', 155, 'PG-13'),
('Inception', 148, 'PG-13'),
('Dinopark', 150, 'PG-13');

INSERT INTO screenings(movie_id, start_time, hall_name, price) VALUES
(1, '2026-02-13 14:00', 'Hall 1', 1200.00),
(1, '2026-02-13 18:00', 'Hall 2', 1500.00),
(2, '2026-02-13 16:00', 'Hall 1', 1300.00),
(3, '2026-02-13 20:00', 'Hall 3', 1400.00);

INSERT INTO seats(screening_id, row_number, seat_number) VALUES
(1, 1, 1), (1, 1, 2), (1, 1, 3),
(2, 1, 1), (2, 1, 2), (2, 1, 3),
(3, 1, 1), (3, 1, 2), (3, 1, 3),
(4, 1, 1), (4, 1, 2), (4, 1, 3);

INSERT INTO reservations(user_id, screening_id, status) VALUES 
(1, 1,'confirmed'),
(2,1,'confirmed'),
(1, 2,'pending'),
(4,1,'confirmed'),
(2, 2,'confirmed'),
(6,1,'confirmed'),
(7, 1,'confirmed'),
(NULL,1,'pending');

INSERT INTO reservation_seat(reservation_id, seat_id) VALUES
(1,2),
(2, 3),
(2, 4),
(3, 5),
(4, 6);

INSERT INTO  payments(reservation_id, amount, payment_method, status, paid_at)VALUES
(1, 2000, 'card',  'confirmed','2026-02-12 10:00'),
(2, 3000, 'arca', 'confirmed', '2026-02-12 11:00'),
(3, 4000, 'idram', 'confirmed', '2026-02-12 12:00'),

(4, 5000, 'card','pending', NULL),
(5, 5000, 'card','pending', NULL),
(6, 5000, 'card','pending', NULL);

COMMIT;
