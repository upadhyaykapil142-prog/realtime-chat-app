import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

const API_URL = "http://localhost:5000";

const socket = io(API_URL);

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Get old messages from MongoDB
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/messages`);

        const savedMessages =
          response.data.data || response.data.messages || [];

        setMessages(savedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Receive new messages through Socket.io
  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
      ]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  // Send message
  const handleSendMessage = (event) => {
    event.preventDefault();

    const cleanUsername = username.trim();
    const cleanMessage = message.trim();

    if (!cleanUsername || !cleanMessage) {
      return;
    }

    socket.emit("sendMessage", {
      username: cleanUsername,
      message: cleanMessage,
    });

    setMessage("");
  };

  return (
    <div className="chat-app">
      <div className="chat-container">

        {/* Header */}
        <header className="chat-header">
          <div className="chat-title">
            <div className="chat-icon">💬</div>

            <div>
              <h1>Real-Time Chat</h1>
              <p>Socket.io Chat Application</p>
            </div>
          </div>

          <div className="online-status">
            <span className="online-dot"></span>
            Online
          </div>
        </header>

        {/* Username */}
        <section className="username-section">
          <label htmlFor="username">
            Your username
          </label>

          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </section>

        {/* Messages */}
        <main className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-message">
              <div>💬</div>
              <p>No messages yet.</p>
              <span>Start the conversation!</span>
            </div>
          ) : (
            messages.map((item, index) => (
              <div
                className="message"
                key={item._id || index}
              >
                <div className="message-header">
                  <strong>
                    {item.username}
                  </strong>

                  <span>
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>

                <p>{item.message}</p>
              </div>
            ))
          )}
        </main>

        {/* Message Input */}
        <form
          className="message-form"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />

          <button
            type="submit"
            disabled={
              !username.trim() || !message.trim()
            }
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;