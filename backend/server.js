const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const { chats } = require("./data/data");
const connectDB = require("./data/config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatroutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api started running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });
// app.get("/api/chat/:id", (req, res) => {
//   const singlechat = chats.find((chat) => chat._id === req.params.id);
//   res.send(singlechat);
// });

const PORT = process.env.Port || 5000;

app.listen(
  PORT,
  console.log(`Server Started at Port number ${PORT}`.yellow.bold)
);
