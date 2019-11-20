

const app = require('express')();
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
    
    setInterval(() => {
      socket.broadcast.emit('rasp:dados',{
        dados:'B'
      })
    }, 1000);

  socket.on('rasp:dados', function(dados){
    io.broadcast.emit('rasp:dados',dados)
   
    
  });
});

  io.on('disconnect', function(socket){
    delete usuariosConectados[socket.id]
    
    socket.broadcast.emit('message', visitas);
  });

http.listen(process.env.PORT ||8181, function(){
  console.log('Servidor rodando em: http://localhost:8181');
});