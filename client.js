const dgram = require('dgram');

const client = dgram.createSocket('udp4');

const { SERVER_PORT, CLIENT_PORT } = require('./const')
client.on('listening', () => {
    console.log(`welcome client`);
});

client.on('message', (msg, rinfo) => {
    console.log(`server say: ${msg}`);
});

client.bind(CLIENT_PORT);

process.stdin.on('data', data => {
    client.send(data, SERVER_PORT, 'localhost', (err) => err && console.error(err))
});

client.send('Client on line', SERVER_PORT, 'localhost', (err) => err && console.error(err))