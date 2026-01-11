const express = require('express');
const {v4:uuid} = require('uuid');
const {readJSON, writeJSON} = require('../utils/jsonStor');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const router = express.Router();
 
//create order
router.post('/',auth,(req,res)=>{
    const{items} = req.body;
        if(!items || !Array.isArray(items) || items.length ===0){
        return res.status(400).send("Items are required");
        }
    const products = readJSON('products.json');
    const orders = readJSON('orders.json');

    let total = 0;
     const orderItems = [];

     //validate && culculate total
     for(const item of items){
        const product = products.find(p=>p.id === item.productId)
        if(!product)return res.status(400).send("Invalid product ID");
        if(product.stock < item.quantity){
             return res.status(400).json({ message: "Insufficient stock" });
        }

        total += product.price * item.quantity;

        orderItems.push({
            id:product.id,
            name:product.name,
            price:product.price,
            quantity:item.quantity
        })

//Deduct stock (IN MEMORY)
        product.stock -= item.quantity;
    }

    //Deduct stock (IN MEMORY)



    //create order
    const newOrder = {
        id:uuid(),
        userId: req.user.id,
        items: orderItems,
        total,
        createdAt: new Date().toISOString()
    }  

    //  WRITE FILES (ATOMIC)
    writeJSON('products.json',products);
    orders.push(newOrder);
    writeJSON('orders.json',orders);

    res.status(201).json(newOrder);

})
    //CUSTOMER → OWN ORDERS 
    router.get('/',auth,role('customer'), (req,res)=>{
        const orders = readJSON('orders.json');
        res.json(orders.filter(o=>o.userId === req.user.id));
        
    })

    //ADMIN → ALL ORDERS
    router.get('/all',auth,role('admin'),(req,res)=>{
        res.json(readJSON('orders.json'));
        

    })

    module.exports = router;

    //1. express.Router() → ստեղծում ենք mini-router, որը մեր order route-ները կպահի

// 2. uuid() → ստեղծում ենք յուրահատուկ ID նոր order-ի համար

//3. readJSON/writeJSON → կարդալ/գրել JSON ֆայլերը, այս դեպքում products.json և orders.json

//4. auth → middleware, որը ստուգում է JWT token, որ user-ը logged in է

//5. role → middleware, որը ստուգում է user-ի role-ը (customer կամ admin)


