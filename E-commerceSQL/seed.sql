BEGIN;

INSERT INTO users(full_name, email) VALUES
('Anna Petrosyan', 'anna@mail.com'),
('David Hakobyan', 'david@mail.com'),
('Mariam Sargsyan', 'mariam@mail.com'),
('Arman Grigoryan', 'arman@mail.com')
RETURNING id;


INSERT INTO products(title, price_amd) VALUES
('Laptop', 350000),
('Phone', 250000),
('Headphones', 30000),
('Keyboard', 20000),
('Mouse', 15000),
('Monitor', 120000);


INSERT INTO orders(user_id, status) VALUES
(1, 'delivered'),
(1, 'delivered'),
(2, 'created'),
(2, 'delivered'),
(3, 'created'),
(NULL, 'created');  -- guest order


INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(1, 1, 1, 450000),
(1, 3, 2, 45000),

(2, 2, 1, 320000),
(2, 4, 1, 30000),

(3, 1, 1, 440000),
(3, 5, 2, 20000),

(4, 6, 1, 180000),
(4, 3, 1, 45000),

(5, 2, 1, 310000),
(5, 6, 1, 175000),

(6, 3, 2, 45000),
(6, 5, 1, 20000);



INSERT INTO payments(order_id, provider, amount_amd, paid_at) VALUES
(1, 'card', 400000, NOW()),
(2, 'idram', 265000, NOW()),
(4, 'arca', 470000, NOW());

COMMIT;
