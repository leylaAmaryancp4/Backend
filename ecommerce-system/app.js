require('dotenv').config();
const express = require('express'); 
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`Server running on  PORT ${PORT}`));

