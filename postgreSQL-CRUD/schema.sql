--students
--courses
--support_tickets
--inventory_items
--DB Name -> pg_crud

BEGIN;
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
full_name  TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
phone  TEXT,
status TEXT NOT NULL DEFAULT 'active',
created_at TIMESTAMP  NOT NULL DEFAULT NOW(),
CHECK (status IN ('active','paused', 'dropped'))

);

CREATE TABLE courses (
id SERIAL PRIMARY KEY,
title  TEXT NOT NULL,
level TEXT NOT NULL,
price_amd  INTEGER NOT NULL,
is_published BOOLEAN  NOT NULL DEFAULT  FALSE,
created_at TIMESTAMP  NOT NULL DEFAULT NOW(),
CHECK (level IN ('beginner','intermediate', 'advanced')),
CHECK (price_amd >= 0)
);


  CREATE TABLE support_tickets(
 id   SERIAL PRIMARY KEY,
subject  TEXT NOT NULL,
description TEXT NOt NULL,
priority TEXT NOT NULL DEFAULT 'medium',
state TEXT NOT NULL  DEFAULT  'open' ,
created_at TIMESTAMP DEFAULT NOW(),
CHECK (state IN ('open', 'in_progress', 'resolved', 'closed')),
CHECK(priority IN ('low', 'medium','high'))

);


CREATE TABLE inventory_items(
    id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
category TEXT NOT NULL,
quantity INTEGER NOT NULL,
unit_price_amd INTEGER NOT NULL,
is_available BOOLEAN DEFAULT TRUE,
updated_at TIMESTAMP  DEFAULT NOW(),
CHECK(category IN('laptop','monitor','cable','chair')),
CHECK(quantity >= 0),
CHECK(unit_price_amd >= 0)
);
COMMIT;