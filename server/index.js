import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    //origin: "http://localhost:3000",
    origin: "https://chichat-fe.onrender.com",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
