require('dotenv').config();
const http = require('http');

const usersRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');
const orderRoutes =  require('./routes/orders.routes');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res)=>{

usersRoutes(req, res);
productRoutes(req,res);
orderRoutes(req, res);
})

server.listen(PORT, ()=>{
    console.log(`Server running on port  ${PORT}`);
})

