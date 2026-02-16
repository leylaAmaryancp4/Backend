--INNER JOIN  "Reservations that belong to registered users only"
SELECT r.id AS reservation_id,
u.full_name ,
r.status,
r.created_at
FROM reservations r JOIN users u ON r.user_id = u.id;

 --LEFT JOIN "All users, even those without reservations"
SELECT 
u.id AS user_id,
u.full_name,
r.id AS reservation_id,
r.status
FROM users u  LEFT JOIN reservations r ON u.id = r.user_id;

--RIGHT JOIN "all reservations, including guest reservations"
SELECT 
u.full_name,
r.id AS reservation_id,
r.status
FROM reservations r RIGHT JOIN  users u ON u.id = r.user_id;

--FULL OUTER JOIN "All users and all reservations together"

SELECT u.full_name,
r.id AS reservation_id,
r.status
FROM users u FULL OUTER JOIN  reservations r ON u.id = r.user_id;

--Many-to-Many JOIN "Reservation → junction table → seats"
--"Քանի որ reservation-ը կարող է ունենալ բազմաթիվ seats, օգտագործում ենք junction table։"

SELECT r.id AS reservation_id,
s.row_number,
s.seat_number
FROM reservations r JOIN reservation_seat rs ON r.id = rs.reservation_id
JOIN seats s ON rs.seat_id = s.id;

--One-to-One JOIN "Reservation with payment Also show unpaid reservations using LEFT JOIN"
 SELECT r.id AS reservation_id,
 p.amount,
p.status
FROM reservations r LEFT JOIN payments p ON r.id = p.reservation_id;


--Movie-based JOIN "Movies → screenings → reservations"
SELECT m.title,
s.start_time,
r.id AS reservation_id
FROM movies m JOIN screenings s ON m.id = s.movie_id
JOIN reservations r ON s.id = r.screening_id;






