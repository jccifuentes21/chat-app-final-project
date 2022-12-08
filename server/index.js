const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoutes");

const socket = require("socket.io");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "https://jccifuentes21.github.io",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
  })
);

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    secure: true,
    sameSite: "none",
    httpOnly: false,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "https://jccifuentes21.github.io");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();
let users = {};

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = users[data.to];
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("receive-message", data);
    }
  });
});
