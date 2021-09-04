const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { SERVER_PORT, CLIENT_PORT } = require('./const')


server.on('listening', () => {
    console.log(`welcome server`);
});

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`client say: ${msg}`);
});

process.stdin.on('data', data => {
    server.send(data, CLIENT_PORT, 'localhost', (err) => err && console.error(err))
});

server.bind(SERVER_PORT);