const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/routers');
const bodyParser = require('body-parser');


app.use(morgan());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', router)

app.listen(3000, () => {
    console.log('API Running')
});