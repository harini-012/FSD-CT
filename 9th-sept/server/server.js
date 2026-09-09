const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {

    console.log("Client connected");

    socket.send(JSON.stringify({
        type: "system",
        message: "Welcome to the chat!"
    }));

    socket.on("message", (data) => {

        const message = JSON.parse(data);

        console.log("Message received:", message);

        // Send message to all connected clients
        wss.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {

                client.send(JSON.stringify({
                    type: "chat",
                    username: message.username,
                    message: message.message
                }));

            }

        });

    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });

});

app.get("/", (req, res) => {
    res.send("WebSocket Chat Server Running");
});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});
