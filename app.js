const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const username = "node-rest";
// const password = process.env.PASSWORD;
const cluster = "Cluster1";
const dbname = "NODE-REST";

mongoose.connect(
    `mongodb+srv://node-rest:nodes@cluster1.fstlx.mongodb.net/nodedb1?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Connected to database');
})
    .catch(() => {
        console.log('Connection failed');
    }
    );
    
mongoose.Promise = global.Promise;

// Routes handling all the requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
}
);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;