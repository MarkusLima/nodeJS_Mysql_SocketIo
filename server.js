const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require('path');
const { Server } = require("socket.io");

const dotenv = require('dotenv');
const { setTimeout } = require('timers/promises');
dotenv.config()

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(bodyParser.json());
app.use('/', routes)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Array para armazenar as conexões de clientes
global.clientsInSocket = [];

const socketIo = new Server(server, {cors: {origin: '*'}});
  
socketIo.on('connection', (socket) => {

  // A client is connected on chat.
  socket.on('new_user', (data) => {
    console.log('A user connected on chat');
    clientsInSocket.push(data);
    socket.broadcast.emit('all_users', clientsInSocket);
  });
  
  // A client is disconnected.
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clientsInSocket.splice(clientsInSocket.indexOf(socket), 1);
  });

  // Read message recieved from client.
  socket.on('message_from_client', (data) => {
    console.log('message_from_client: ', data);
    socket.broadcast.emit('message_from_server', data);
  });
  
});

module.exports = { app };
