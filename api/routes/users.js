const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../Models/user');
const bcrypt = require('bcrypt');

routers.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(
        user => {
            if (user.length>=1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            }
                            );
                    }
                }
                );
            }
        }).catch(
            err => {
                return res.status(500).json({
                    error: err
                });
            }
        )
})

routers.delete('/:userId', (req, res, next) => {
    User.remove({
        _id: req.params.userId
    }).exec().then(
        result => {
            res.status(200).json({
                message: 'User deleted'
            });
            console.log(result);
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            });
        }
    )
})

module.exports = routers;