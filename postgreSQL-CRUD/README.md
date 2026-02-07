# PostgreSQL CRUD Project

 How to create the database

Open `psql` (PostgreSQL terminal) and run -> sql
-> Connect as the postgres user
psql -U postgres

-> Create a new database
CREATE DATABASE pg_crud;

-> Connect to the new database
\c pg_crud


-> Run the SQL file that contains your table definitions and constraints
\i schema.sql

This will create all tables with:
.Primary keys
.Not-null constraints
.Unique constraints
.Check constraints
.Default values


-> Run the SQL file that contains your seed data and queries

This will:
.Insert initial data into your tables
.Run SELECT queries to view data
.Run UPDATE queries to modify data
.Run DELETE queries to remove data