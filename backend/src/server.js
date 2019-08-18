const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://TinderDev:TinderDev@cluster0-iwaft.mongodb.net/TinderDev?retryWrites=true&w=majority', {
    useNewUrlParser:true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
  
    return next();
  });
  

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);