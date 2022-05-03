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
        .exec()
        .then(docs => {
            res.status(200).json(docs);
            console.log(docs);
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
            message: 'Handling Post requests /products',
            createdProduct: result
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
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    //   }
    
    Product.updateMany({ _id: id }, { $set: { name: req.body.name, price: req.body.price } })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
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
            res.status(200).json({
                result
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
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json(product);
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