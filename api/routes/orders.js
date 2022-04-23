const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()


routers.get('/', (req, res, next) => {
    res.status(200).json({
          message: 'Orders Fetched'
    });
})
routers.post('/', jsonParser, (req, res, next) => {
    const orderBody={
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
          message: 'Orders Created',
          order: orderBody,
    });
})
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