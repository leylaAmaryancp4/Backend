const express = require('express');
const { v4: uuid } = require('uuid');
const { readJSON, writeJSON } = require('../utils/jsonStor'); 
const auth = require('../middleware/auth.middleware');
const rol = require('../middleware/role.middleware');

const router = express.Router();

/*  PUBLIC ROUTES */

// GET /products → բոլորը products են տեսնում
router.get('/', (req, res) => {
    const products = readJSON('products.json');
    res.json(products);
});

// GET /products/:id → մեկ product ըստ id
router.get('/:id', (req, res) => {
    const products = readJSON('products.json');
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
});

/*  ADMIN ROUTES */

// POST /products → նոր product ավելացնել
router.post('/', auth, rol('admin'), (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == undefined) {
        return res.status(400).send("Name, price and stock are required");
    }

    const products = readJSON('products.json');

    const newProduct = {
        id: uuid(),
        name,
        price,
        stock: Number(stock), // ապահովվում է, որ stock-ը թիվ է
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    writeJSON('products.json', products);
    res.status(201).json(newProduct);
});

// PATCH /products/:id → product թարմացնել
router.patch('/:id', auth, rol('admin'), (req, res) => {
    const products = readJSON('products.json');
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send("Product not found");


    if (req.body.stock !== undefined) {
    req.body.stock = Number(req.body.stock);
  }

    Object.assign(products[index], req.body); // թարմացնում է միայն ուղարկված դաշտերը
    writeJSON('products.json', products);
    res.json(products[index]);
});

// DELETE /products/:id → product ջնջել
router.delete('/:id', auth, rol('admin'), (req, res) => {
    const products = readJSON('products.json');
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) return res.status(404).send("Product not found");

    products.splice(index, 1);
    writeJSON('products.json', products);
    res.json({ message: "Product deleted successfully" });
});

module.exports = router;




//Սա Express Router է, որը կառավարում է ապրանքները (products)․
//Տվյալները պահվում են products.json ֆայլում (ոչ տվյալաբազա)։
// 🔓Public (բոլորի համար)
//🔒 Admin-only (միայն ադմինի համար)
//PATCH /products/:id Թարմացնում է գոյություն ունեցող ապրանքը
//Object.assign → փոխում է միայն ուղարկված դաշտերը
//Եթե ապրանքը չկա → 404