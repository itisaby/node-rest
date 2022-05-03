const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Order = require('../Models/order');
// const Product = require('../Models/products');
var jsonParser = bodyParser.json()


routers.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders Fetched'
    });
})

routers.post('/', jsonParser, (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
    });
    order
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

routers.get('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(201).json({
        message: 'Orders Details',
        id: id
    });
})
routers.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(201).json({
        message: 'Orders Deleted',
        id: id
    });
})

module.exports = routers;