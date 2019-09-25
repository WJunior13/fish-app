const express = require('express')
const bodyParser = require('body-parser')
const allowCrossDomain = require('./middleware/cross')
const morgan = require('morgan');


const app = express();
app.use(morgan())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(allowCrossDomain);

app.disable('x-powered-by');


//app.use(express.static('src/app')) servir conteudo estatico


require('./api/routes')(app)

app.listen(3000, () => {
    console.log("API run at port 3000")
});
