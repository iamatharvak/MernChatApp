const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const { chats } = require("./data/data");
const connectDB = require("./data/config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatroutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { Socket } = require("socket.io");

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
app.use("/api/message", messageRoutes);

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

const server = app.listen(
  PORT,
  console.log(`Server Started at Port number ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log(`User joined room ` + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
