const express = require("express");

const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");

const router = express.Router();

// GET /api/messages
router.get("/", getMessages);

// POST /api/messages
router.post("/", sendMessage);

module.exports = router;