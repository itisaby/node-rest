const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Order = require('../Models/order');
const Product = require('../Models/products');
var jsonParser = bodyParser.json()

routers.get('/', async (req, res, next) => {
   await Order.find()
    .select('_id product quantity')
    .exec()
    .then(
        docs => {
            res.status(200).json(
                {
                    count: docs.length,
                    orders: docs.map(doc => {
                        return {
                            _id: doc._id,
                            product: doc.product,
                            quantity: doc.quantity,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8000/orders/' + doc._id
                            }
                        }
                    }
                    )  
                }
            );
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    )
})

routers.post('/', jsonParser, (req, res, next) => {
        Product.findById(req.body.productId).exec().then(
        product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            return order.save()
            .then((result) => {
                console.log(result);
                res.status(201).json({
                    message: 'Order stored',
                    createdOrder: {
                        _id: result._id,
                        quantity: result.quantity,
                        product: result.product,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8000/orders/' + result._id
                        }
                    }
                });
            }).catch(
                err => {
                    res.status(500).json({
                        error: err
                    });
                }
            )
            
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    )
});

routers.get('/:id', (req, res, next) => {
    Order.findById(req.params.id).exec().then(
        order => {
            if (!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/orders'
                }
            });
        } ).catch(error => {
            res.status(500).json({
                error: error
            });
        }
    )
})

routers.delete('/:id', (req, res, next) => {
    Order.deleteOne({ _id: req.params.id }).exec().then(
        result => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:8000/orders',
                    body: {
                        productId: 'String',
                        quantity: 'Number'
                    }
                }
            });
        } ).catch(
            err => {
                res.status(500).json({
                    error: err
                });
            }
        )
})

module.exports = routers;
