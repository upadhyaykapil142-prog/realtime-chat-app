    const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// REST API
app.use("/api/messages", messageRoutes);

// Test API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Real-Time Chat API is running",
  });
});

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send message
  socket.on("sendMessage", async (data) => {
    try {
      const { username, message } = data;

      if (!username || !message) {
        socket.emit("messageError", {
          message: "Username and message are required",
        });
        return;
      }

      // Save message to MongoDB
      const newMessage = await Message.create({
        username,
        message,
      });

      // Broadcast to all connected users
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Socket message error:", error.message);

      socket.emit("messageError", {
        message: "Failed to send message",
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});