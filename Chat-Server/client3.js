const net = require('node:net');
const PORT = 3001;

const socket = net.connect(PORT, () => {
    console.log("Connected to server");
});

// Receive messages from server
socket.on('data', (data) => {
    console.log(data.toString().trim());
});

// Send messages typed in terminal to server
process.stdin.on('data', (input) => {
    socket.write(input.toString().trim());
});

// Handle disconnect
socket.on('end', () => {
    console.log("Disconnected from server");
});
socket.on('error', (err) => {
    console.error("Connection error:", err.message);
});
