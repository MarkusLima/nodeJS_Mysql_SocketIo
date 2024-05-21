const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const path = require('path');
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const { sequelize } = require('./model/model');
const { Room, CreateOrUpdate, Destroy } = require('./model/roomModel');
dotenv.config();

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(bodyParser.json());
app.use('/', routes)

const PORT = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();
})();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const socketIo = new Server(server, {cors: {origin: '*'}});
  
socketIo.on('connection', (socket) => {

  // A client is connected on chat.
  socket.on('new_user', async (data) => {
    console.log('A user connected on chat');

    //se o cliente que entrou no chat ja tem outra aba do navegador aberta
    if ( data.user.isInRoom ) {

      //pega todos os sockets
      const sockets = await socketIo.fetchSockets();
      
      //Procura o socket da outra aba para deslogar ele
      for (const socket_io of sockets) {
        console.log("socket id",socket_io.id);
        if (socket_io.id == data.user.isInRoom) { // se achar
          const info = await CreateOrUpdate( data.user );//Se tiver algo para atualizar
          socket_io.emit('auto_disconnect_user', info); // emite para a outra aba
          socket.broadcast.emit('disconnect_user', info); //informa para todos os outros sockets
          socket_io.disconnect(true);//desconecta
        }
      }

    }

    const info = await CreateOrUpdate( data.user );
    socket.broadcast.emit('all_users', info);
  });
  
  // A client is disconnected.
  socket.on('disconnect', async () => {
    console.log('A user disconnected');
    const info = await Destroy( socket.id );
    socket.broadcast.emit('disconnect_user', info);
  });

  // Read message recieved from client.
  socket.on('message_from_client', (data) => {
    console.log('message_from_client: ', data);
    socket.broadcast.emit('message_from_server', data);
  });
  
});

module.exports = { app };
