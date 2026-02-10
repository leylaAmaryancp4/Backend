--INNER JOIN 
-- Show only orders that belong to registered users
SELECT o.id AS order_id,
u.full_name,
o.status,
o.created_at FROM orders o INNER JOIN users u ON o.user_id = u.id;

--LEFT JOIN
--Show all users, including users who have no orders.
SELECT u.full_name,
o.id AS order_id,
o.status  FRom users u LEFT JOIN orders o ON u.id = o.user_id;


--RIGHT JOIN 
--Show all orders, including guest orders.
SELECT o.id AS order_id,
u.full_name,
o.status FROM users u RIGHT JOIN orders o ON  u.id = o.user_id;

--Full OUTER JOIN 
--Show all users and all orders together.

SELECT u.full_name,
o.id AS order_id,
o.status FROM users u FULL OUTER JOIN orders o ON u.id = o.user_id;


--MANY-TO-MANY JOIN
--List products inside each order
SELECT oi.order_id,
p.title,
oi.quantity,
oi.unit_price_amd FROM order_items oi INNER JOIN products p ON oi.product_id = p.id;

--Show all orders and payment information if it exists
SELECT o.id AS order_id,
p.provider,
p.amount_amd,
o.status FROM orders o LEFT JOIN payments p ON o.id = p.order_id;

--ALWAYS օգտագործիր table aliases (o, u, p, oi):


-- Aggregation
--Calculate total price per order.
SELECT order_id,
SUM(quantity * unit_price_amd) AS total_amd FROM order_items GROUP BY order_id;

--Calculate how much money each user has spent.
SELECT u.id AS user_id,
u.full_name,

COALESCE(SUM(oi.quantity * oi.unit_price_amd), 0) AS total_spend_amd FROM users u LEFT JOIN orders o ON o.user_id = u.id LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY u.id;

-- Find products sold in the highest total quantity

SELECT p.id  AS product_id,
p.title,
SUM(oi.quantity) AS total_quantity FROM products p JOIN order_items oi ON oi.product_id = p.id
GROUP BY p.id, p.title ORDER BY total_quantity DESC;


