import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {

            const data = JSON.parse(event.data);

            setMessages((previousMessages) => [
                ...previousMessages,
                data
            ]);

        };

        ws.onclose = () => {
            console.log("Disconnected from server");
        };

        setSocket(ws);

        return () => ws.close();

    }, []);

    const sendMessage = () => {

        if (!username || !message) {
            alert("Enter username and message");
            return;
        }

        socket.send(JSON.stringify({
            username: username,
            message: message
        }));

        setMessage("");
    };

    return (
        <div className="container">

            <h1>Real-Time Chat</h1>

            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <div className="chat-box">

                {messages.map((msg, index) => (

                    <div key={index} className="message">

                        {msg.type === "system" ? (
                            <p><i>{msg.message}</i></p>
                        ) : (
                            <p>
                                <strong>{msg.username}: </strong>
                                {msg.message}
                            </p>
                        )}

                    </div>

                ))}

            </div>

            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>
                Send
            </button>

        </div>
    );
}

export default App;

