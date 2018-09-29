var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9999, function () {
  console.log("server listening on 9999");
});
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("a user connected: " + socket.id);
  socket.on("disconnect", function () {
    console.log("a user disconnected: " + socket.id);
  })
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    console.log(socket.id + ' message: ' + msg);
  });
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

io.on("disconnection", function () {
  console.log("???");
})