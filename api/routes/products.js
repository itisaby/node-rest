const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.status(200).json({
          message: 'Handling Get requests /products'
    });
})

routes.post('/', (req, res, next) => {
    res.status(201).json({
          message: 'Handling Post requests /products'
    });
})
routes.patch('/', (req, res, next) => {
    res.status(200).json({
          message: 'Handling Patch requests /products'
    });
})
routes.delete('/', (req, res, next) => {
    res.status(200).json({
          message: 'Handling Delete requests /products'
    });
})

routes.post("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if(id==="special"){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else{
        res.status(200).json({
            message: 'Post request for product id ',
            id: id
        });
    }
})

module.exports = routes;