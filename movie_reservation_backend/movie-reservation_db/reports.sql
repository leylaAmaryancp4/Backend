--Create at least 5 analytical reports using GROUP BY.

/* Required reports
1. Total price per reservation (seat price-երի գումար)
2. Total revenue per movie
3. Reservation count per user
4. Most popular movies (by seat count)
5. Unpaid reservations list (anti-join) */

-- Total price per reservation(based on payments)
SELECT r.id AS reservation_id,
COALESCE(p.amount) AS total_price
FROM reservations r   LEFT JOIN  payments p ON  r.id = p.reservation_id
ORDER BY  total_price DESC;


---- Total revenue per movie (sum of payments) «ֆիլմից ստացված ամբողջ գումարը»
SELECT m.title,
       SUM(p.amount) AS total_revenue
FROM movies m
JOIN screenings sc ON m.id = sc.movie_id
JOIN reservations r ON sc.id = r.screening_id
JOIN payments p ON r.id = p.reservation_id WHERE  p.status = 'confirmed'
GROUP BY m.title
ORDER BY total_revenue DESC;

--Reservation count per user
SELECT u.full_name,
COUNT(r.id) AS reservation_count
FROM users u LEFT  JOIN reservations r ON u.id = r.user_id
GROUP BY u.full_name
ORDER BY reservation_count ASC;

--Most popular movies (by seat count)
SELECT m.title,
COUNT(s.seat_id) AS total_seats_sold
FROM  movies m LEFT JOIN screenings sc ON m.id = sc.movie_id
LEFT JOIN reservations r ON  sc.id = r.screening_id
LEFT JOIN reservation_seat s ON r.id = s.reservation_id
GROUP BY m.title
ORDER BY total_seats_sold DESC;

--Unpaid reservations list (anti-join)
-- Unpaid reservations (status = pending OR no payment)
SELECT r.id AS reservation_id,
       r.user_id,
       r.screening_id,
       r.status,
       r.created_at
FROM reservations r
LEFT JOIN payments p ON r.id = p.reservation_id
WHERE p.status IS NULL OR p.status != 'confirmed'
ORDER BY r.created_at;






