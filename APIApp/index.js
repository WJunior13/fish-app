const express = require('express')
const bodyParser = require('body-parser')
const allowCrossDomain = require('./middleware/cross')
const morgan = require('morgan');
var cors = require('cors')  

const app = express();
app.use(morgan())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(allowCrossDomain);
app.use(cors())


app.disable('x-powered-by');

const http = require('http').Server(app);
const io = require('socket.io')(http)




var usuariosConectados={};



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var visitas = 0;
io.on('connection', function(socket){
    usuariosConectados[socket.id]=55;

    console.log(socket.id)
    
  

    socket.on('parametros', data=>{
        socket.emit('rasp:dados',data)
    })


});

  io.on('disconnect', function(socket){
    delete usuariosConectados[socket.id]
    
    socket.broadcast.emit('message', visitas);
  });

  
  
  
  //app.use(express.static('src/app')) servir conteudo estatico
  
  
  require('./api/routes')(app)
  
  http.listen(process.env.PORT || 8181, function(){
    console.log('Servidor rodando em: http://localhost:8181');
  });
