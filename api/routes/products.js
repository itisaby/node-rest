const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const Product = require('../Models/products');
const mongoose = require('mongoose');
var jsonParser = bodyParser.json()

routes.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Handling Get requests /products'
    // });
    Product.find()
        .select('_id name price')  // only return these fields
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
            console.log(response);
        }).catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });
})

routes.post('/', jsonParser, (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        // res.status(201).json({
        //     message: 'Handling Post requests /products',
        //     createdProduct: Product
        // });
        console.log(result);
        res.status(201).json({
            message: 'Product created successfully',
            createdProduct: {
                _id: result._id,
                name: result.name,
                price: result.price,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/products/' + result._id
                }
            }
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        });
        console.log(error);
    })

})

routes.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.updateMany({ _id: id }, {
        $set: updateOps
        // { name: req.body.name, price: req.body.price }
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/products/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    // res.status(200).json({
    //     message: 'Handling Patch requests /products'
    // });
})


routes.delete('/:productId', (req, res, next) => {
    // res.status(200).json({
    //     message: 'Handling Delete requests /products'
    // });
    const id = req.params.productId;
    Product.remove({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json(
                {
                    message: 'Product deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:8000/products',
                        body: {
                            name: 'String',
                            price: 'Number'
                        }

                    }
                });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
            console.log(error);
        })
})

routes.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    // if(id==="special"){
    //     res.status(200).json({
    //         message: 'You discovered the special ID',
    //         id: id
    //     });
    // } else{
    //     res.status(200).json({
    //         message: 'Post request for product id ',
    //         id: id
    //     });
    // }
    Product.findById(id)
        .select('_id name price')
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    product: product,
                    request: {
                        type: 'GET',
                        description: 'Get all products',
                        url: 'http://localhost:8000/products/'
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        })
})

module.exports = routes;