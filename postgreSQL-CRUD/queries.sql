BEGIN;
INSERT INTO students (full_name, email, phone, status) VALUES
('Anna Hakobyan', 'anna@mail.com', '091111111', 'active'),
('Arman Petrosyan', 'arman@mail.com', '091222222', 'paused'),
('Mariam Sargsyan', 'mariam@mail.com', '091333333', 'active'),
('David Mkrtchyan', 'david@mail.com', '091444444', 'paused'),
('Lilit Grigoryan', 'lilit@mail.com', '091555555', 'active'),
('Narek Hovhannisyan', 'narek@mail.com', '091666666', 'active'),
('Sona Vardanyan', 'sona@mail.com', '091777777', 'active'),
('Gor Melikyan', 'gor@mail.com', '091888888', 'active');

INSERT INTO courses (title, level, price_amd, is_published) VALUES
('JavaScript Basics', 'beginner', 50000, true),
('Node.js Fundamentals', 'intermediate', 70000, true),
('Advanced PostgreSQL', 'advanced', 90000, true),
('HTML & CSS', 'beginner', 40000, true),
('TypeScript Deep Dive', 'intermediate', 80000, false);

INSERT INTO support_tickets (subject, description, priority, state) VALUES
('Login issue', 'Cannot login to account', 'high', 'open'),
('Payment error', 'Payment failed during checkout', 'high', 'in_progress'),
('UI bug', 'Button not clickable', 'medium', 'open'),
('Slow performance', 'App is slow', 'medium', 'open'),
('Account suspended', 'Account paused unexpectedly', 'low', 'resolved'),
('Email issue', 'Did not receive verification email', 'medium', 'closed'),
('Password reset', 'Reset link not working', 'low', 'open'),
('Course access', 'Cannot access purchased course', 'medium', 'open');


INSERT INTO inventory_items (name, category, quantity, unit_price_amd, is_available) VALUES
('MacBook Pro', 'laptop', 5, 1200000, true),
('Dell Monitor', 'monitor', 0, 180000, false),
('HDMI Cable', 'cable', 0, 5000, false),
('Office Chair', 'chair', 10, 75000, true),
('USB-C Cable', 'cable', 25, 7000, true),
('Gaming Monitor', 'monitor', 3, 250000, true),
('Lenovo Laptop', 'laptop', 0, 950000, false),
('Wireless Mouse', 'cable', 40, 6000, true),
('Ergonomic Chair', 'chair', 4, 120000, true),
('Standing Desk Cable', 'cable', 15, 8000, true);
COMMIT;


--SELECT * FROM students WHERE status = 'active' ORDER BY created_at DESC;
--SELECT * FROM students WHERE email = 'lilit@mail.com';
--SELECT * FROM students WHERE phone IS NOT NULL;
--SELECT * FROM courses WHERE is_published = TRUE AND price_amd BETWEEN 50000 AND 80000; 
--SELECT * FROM support_tickets WHERE state = 'open' AND priority = 'high';
--SELECT * FROM support_tickets WHERE created_at >= NOW() - INTERVAL '7 days';
--SELECT * FROM inventory_items WHERE quantity  = 0;
--SELECT id, name, quantity, unit_price_amd, quantity * unit_price_amd AS total_value_amd FROM inventory_items;




--UPDATE students  SET status = 'paused' where full_name = 'Anna Hakobyan' AND status = 'active';
--UPDATE students SET phone = '00000000' WHERE full_name='Mariam Sargsyan';
--UPDATE courses SET is_published = true WHERE level = 'beginner';
--UPDATE support_tickets SET state = 'in_progress' WHERE state = 'open';
--UPDATE support_tickets SET state = 'resolved' Where priority = 'low';
--UPDATE inventory_items SET quantity = quantity + 1, updated_at = NOW() WHERE category = 'laptop';




--DELETE FROM students WHERE email = 'anna@mail.com';
--DELETE FROM support_tickets WHere state = 'closed';
--DELETE FROM inventory_items WHERE is_available = FALSE;