const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { chats } = require("./data/data");
const app = express();
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Api started running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const singlechat = chats.find((chat) => chat._id === req.params.id);
  res.send(singlechat);
});

const PORT = process.env.Port || 5000;

app.listen(PORT, console.log(`Server Started at Port number ${PORT}`));
