const sio = require('socket.io')();

sio.on('connection', (client) => {
  console.log(Date.now() + ' | Socket | Client Id: ' + client.id + ' | Connected');
  
  client.on('disconnect', () => {
    console.log(Date.now() + ' | Socket | Client Id: ' + client.id + ' | Disconnected');
  });
  
  client.on('RootInput', (data) => {
    console.log(Date.now() + ' | Socket | Client Id: ' + client.id + ' | emit: RootInput\n', data);
    sio.emit('RootInput', data);
  });
  
});

const port = 3001;
sio.listen(port);
console.log(Date.now() + ' | Socket | Listening on:', 'http://localhost:' + port);
