const express = require('express');
const routers = express.Router();


routers.get('/', (req, res, next) => {
    res.status(200).json({
          message: 'Orders Fetched'
    });
})
routers.post('/', (req, res, next) => {
    res.status(201).json({
          message: 'Orders Created'
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