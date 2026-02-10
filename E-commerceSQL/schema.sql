BEGIN;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS armenian_provider;



 CREATE TABLE users(
    id SERIAL PRIMARY KEY,
full_name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
created_at TIMESTAMP NOT NULL DEFAULT  NOW()
 );

 CREATE TABLE products(
   id SERIAL PRIMARY KEY,
title  TEXT NOT NULL,
price_amd INTEGER NOT NULL,
created_at  TIMESTAMP DEFAULT  NOW()
 );

 CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
status  TEXT DEFAULT 'created',
created_at TIMESTAMP DEFAULT NOW(),
CHECK (status IN ('created', 'canceled', 'in-progress', 'delivered'))
 );


CREATE TYPE armenian_provider AS ENUM ('card', 'idram', 'arca');

 CREATE TABLE payments(
    id SERIAL PRIMARY KEY,
order_id  INTEGER REFERENCES orders(id),
provider armenian_provider,
amount_amd INTEGER NOT NULL,
paid_at TIMESTAMP,
CHECK (amount_amd >= 0)
 );

 CREATE TABLE order_items(
 id   SERIAL PRIMARY KEY,
order_id  INTEGER REFERENCES orders(id),
product_id INTEGER REFERENCES products(id),
quantity INTEGER NOT NULL,
unit_price_amd INTEGER NOT NULL,
CHECK (unit_price_amd >= 0),
CHECK (quantity >= 0)

);

COMMIT;