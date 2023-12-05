
const WebSocket = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {
  // Maneja las solicitudes HTTP aquí
});

const webSocketServer = new WebSocket({
  httpServer: server,
});

// Almacena las conexiones abiertas
const connections = [];

webSocketServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  console.log('Conexión WebSocket aceptada');

  // Agrega la nueva conexión al array
  connections.push(connection);
  console.log(connections.length);

  connection.on('message', (message) => {
    // Maneja los mensajes entrantes de WebSocket aquí
    console.log('Mensaje recibido: ', message.utf8Data);

    //Edita message.fromMe a false
    let messageObject = JSON.parse(message.utf8Data);
    messageObject.fromMe = false;
    message.utf8Data = JSON.stringify(messageObject);

    // Envía el mensaje a todas las conexiones abiertas
    connections.forEach((clientConnection) => {
      if (clientConnection !== connection) {
        clientConnection.sendUTF(message.utf8Data);
      }
    });
  });

  connection.on('close', (reasonCode, description) => {
    // Maneja el cierre de la conexión WebSocket aquí

    // Elimina la conexión cerrada del array
    const index = connections.indexOf(connection);
    if (index !== -1) {
      connections.splice(index, 1);
      console.log('Conexión cerrada: ', connection);
    }
  });
});

server.listen(3001, () => {
  console.log('El servidor WebSocket está escuchando en el puerto 3001');
});

