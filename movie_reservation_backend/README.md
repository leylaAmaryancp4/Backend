# Movie Reservation System - Backend API

A Node.js/Express backend server for a movie reservation system with PostgreSQL database.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v10 or higher)
- npm

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=movie_reservation
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_DEFAULT_NAME=postgres
   DB_LOCALHOST=localhost
   ```

## Database Setup

### Step 1: Create Database Schema
Run the schema file to create all necessary tables:
```bash
psql -U postgres -h localhost -d postgres -f movie-reservation_db/schema.sql
```

### Step 2: Seed Sample Data
Populate the database with sample data:
```bash
psql -U postgres -h localhost -d movie_reservation -f movie-reservation_db/seed.sql
```

### Step 3: Run Additional SQL Scripts (Optional)
- Reports: `psql -U postgres -h localhost -d movie_reservation -f movie-reservation_db/reports.sql`
- Joins: `psql -U postgres -h localhost -d movie_reservation -f movie-reservation_db/joins.sql`

### Database Name
**`movie_reservation`** - The main database for the movie reservation system

## Starting the Backend Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on **PORT 3001** (or the port specified in your `.env` file).

You should see the message:
```
Server running on PORT 3001
```

## API Endpoints

### 1. Get All Movies
**Endpoint:** `GET /movies`

**Description:** Retrieve all available movies

**Example Request:**
```
http://localhost:3001/movies
```

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Interstellar",
    "duration_minutes": 169,
    "rating": "PG-13",
    "created_at": "2026-02-13T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Dune",
    "duration_minutes": 155,
    "rating": "PG-13",
    "created_at": "2026-02-13T10:30:00.000Z"
  }
]
```

---

### 2. Get Screenings for a Movie
**Endpoint:** `GET /movies/:id/screenings`

**Description:** Get all screenings (showtimes) for a specific movie

**Parameters:**
- `id` (integer, required): Movie ID

**Example Request:**
```
http://localhost:3001/movies/1/screenings
```

**Example Response:**
```json
[
  {
    "id": 1,
    "movie_id": 1,
    "start_time": "2026-02-13T14:00:00.000Z",
    "hall_name": "Hall 1",
    "price": "1200.00"
  },
  {
    "id": 2,
    "movie_id": 1,
    "start_time": "2026-02-13T18:00:00.000Z",
    "hall_name": "Hall 2",
    "price": "1500.00"
  }
]
```

**Error Response (if movie not found):**
```json
{
  "message": "NO screening found for this movie"
}
```

---

### 3. Get User Reservations
**Endpoint:** `GET /users/:id/reservations`

**Description:** Get all reservations for a specific user

**Parameters:**
- `id` (integer, required): User ID

**Example Request:**
```
http://localhost:3001/users/1/reservations
```

**Example Response:**
```json
[
  {
    "user_id": 1,
    "full_name": "Alice Smith",
    "reservation_id": 1,
    "status": "confirmed",
    "created_at": "2026-02-13T11:25:00.000Z"
  },
  {
    "user_id": 1,
    "full_name": "Alice Smith",
    "reservation_id": 3,
    "status": "pending",
    "created_at": "2026-02-13T11:30:00.000Z"
  }
]
```

---

### 4. Get Unpaid Reservations
**Endpoint:** `GET /reservations/unpaid`

**Description:** Retrieve all reservations that have not been paid yet

**Example Request:**
```
http://localhost:3001/reservations/unpaid
```

**Example Response:**
```json
[
  {
    "reservation_id": 3,
    "created_at": "2026-02-13T11:30:00.000Z",
    "full_name": "Alice Smith"
  },
  {
    "reservation_id": 8,
    "created_at": "2026-02-13T12:15:00.000Z",
    "full_name": "Frank Miller"
  }
]
```

---

### 5. Get Reservation Details
**Endpoint:** `GET /reservations/:id`

**Description:** Get complete details of a specific reservation including seats, pricing, and payment information

**Parameters:**
- `id` (integer, required): Reservation ID

**Example Request:**
```
http://localhost:3001/reservations/1
```

**Example Response:**
```json
[
  {
    "reservation_id": 1,
    "status": "confirmed",
    "created_at": "2026-02-13T11:20:00.000Z",
    "full_name": "Alice Smith",
    "email": "alice@example.com",
    "row_number": 1,
    "seat_number": 2,
    "screening_id": 1,
    "start_time": "2026-02-13T14:00:00.000Z",
    "hall_name": "Hall 1",
    "ticket_price": "1200.00",
    "payment_id": 1,
    "amount": "1200.00",
    "payment_method": "card",
    "payment_status": "confirmed",
    "paid_at": "2026-02-13T11:25:00.000Z"
  }
]
```

---

### 6. Get Movie Revenue Report
**Endpoint:** `GET /reports/movies-revenue`

**Description:** Get aggregated revenue data for each movie (only confirmed payments included)

**Example Request:**
```
http://localhost:3001/reports/movies-revenue
```

**Example Response:**
```json
[
  {
    "title": "Interstellar",
    "total_revenue": "3600.00"
  },
  {
    "title": "Dune",
    "total_revenue": "1300.00"
  },
  {
    "title": "Inception",
    "total_revenue": "0.00"
  }
]
```

---

## Database Schema

### Tables
- **users**: Customer information
- **movies**: Movie details
- **screenings**: Movie showtimes and pricing
- **seats**: Available seats for each screening
- **reservations**: Booking records
- **reservation_seat**: Link between reservations and seats
- **payments**: Payment transaction details

### Data Types
- Payment Methods: `card`, `idram`, `arca`
- Payment Status: `pending`, `confirmed`, `cancelled`
- Reservation Status: `pending`, `confirmed`, `cancelled`

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Driver**: pg
- **Dev Tool**: Nodemon
- **Environment**: dotenv

## Scripts

```bash
# Development mode with auto-reload
npm run dev

# Test (not configured)
npm run test
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid input)
- `404`: Not Found (resource not found)
- `500`: Server Error

## License

ISC open-source license;
