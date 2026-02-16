const settings = require('./config');
const { ifDBExists, initDB } = require('./database/db');
const express = require('express');

const app = express();
app.use(express.json());

const pool = initDB();

//Get all movies
app.get('/movies', async(req,res)=>{
    const result =  await pool.query("SELECT * FROM movies")
    res.send(result.rows)
});


//Get screenings of a movie
app.get('/movies/:id/screenings', async(req,res)=>{
    try{
    const movieId = req.params.id;
    if(isNaN(movieId)){
        return res.status(400).send({message:"Movie id is invalid"});
    }
    const result = await pool.query("SELECT * FROM screenings WHERE movie_id = $1 ORDER BY start_time", [movieId])
    if(!result.rowCount)
        return res.status(404).send({message:"NO screening found for this movie"});
        res.send(result.rows);
    
}catch(err){
console.log(err.message)
}
});


//Get reservations of a user
app.get('/users/:id/reservations', async (req,res)=>{
    try{
        const userId = req.params.id;
        const result = await pool.query(
            `SELECT  u.id AS user_id ,
            u.full_name,
            r.id AS reservation_id,
            r.status,
            r.created_at
            FROM users  u JOIN  reservations r ON u.id = r.user_id
            WHERE  u.id = $1 ORDER BY r.created_at DESC`,
            [userId])
            res.json(result.rows);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:"Server error"})
    }
}); 


// Get unpaid reservations
app.get('/reservations/unpaid', async(req,res)=>{
    try{
        
        const result = await pool.query(
            `SELECT r.id AS reservation_id,
            r.created_at,
            u.full_name
            FROM reservations r  JOIN users u  ON u.id =r.user_id
            LEFT JOIN payments p ON r.id = p.reservation_id 
            WHERE p.id IS NULL `)

            res.json(result.rows)
        
        }catch(err){
        console.log(err.message);
        res.status(500).send({massage:"Server error"})
    }
});


// Get reservation details
/*
Returns:
reservation info
seats
prices
payment info (if exists)
*/
app.get('/reservations/:id', async(req,res)=>{
    try{
        const reservationId = req.params.id;
        const result = await pool.query(
            `SELECT  r.id AS reservation_id,
            r.status,
            r.created_at,
            
            u.full_name,
            u.email,

            st.row_number,
            st.seat_number,

            s.id AS screening_id,
            s.start_time,
            s.hall_name,
            s.price AS ticket_price,

            p.id AS payment_id,
            p.amount,
            p.payment_method,
            p.status AS payment_status,
            p.paid_at
            FROM reservations r JOIN users u ON u.id = r.user_id 
            JOIN screenings s ON r.screening_id = s.id
            JOIN reservation_seat rs ON r.id = rs.reservation_id 
            JOIN seats st ON st.id = rs.seat_id
            LEFT JOIN payments p ON r.id = p.reservation_id WHERE r.id = $1 `,[reservationId]);
res.json(result.rows);

    }catch(err){
        console.log(err.message)
        res.status(500).send({message:"Server  error"});
    }
});


// Movie revenue report
/*
GET /reports/movies-revenue
Returns aggregated data per movie
*/

app.get('/reports/movies-revenue', async (req, res) => {
    try {
        const result = await pool.query(
           `SELECT m.title,
       SUM(p.amount) AS total_revenue
FROM movies m
JOIN screenings sc ON m.id = sc.movie_id
JOIN reservations r ON sc.id = r.screening_id
JOIN payments p ON r.id = p.reservation_id WHERE  p.status = 'confirmed'
GROUP BY m.title
ORDER BY total_revenue DESC`

        );

        res.json(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
});




ifDBExists().then(()=>{
    
app.listen(settings.PORT,()=>{
    console.log('Server running on PORT 3001');
})
})
