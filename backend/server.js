import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import pkg from 'agora-access-token';
import { Server } from 'socket.io';
import http from 'http';

const { RtcTokenBuilder, RtcRole } = pkg;

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const APP_ID = "6aaf461638d144148e4cf28c95de56bb";
const APP_CERTIFICATE = "80973f24e98d4a6fb85768c780d1409c";


const onlineUsers = {};

io.on('connection', (socket) => {
  socket.on('register', ({ userId }) => {
    onlineUsers[userId] = socket.id;
  });

  socket.on('call-user', ({ from, to, channel }) => {
    const userSocketId = onlineUsers[to];
    if (userSocketId) {
      io.to(userSocketId).emit('incoming-call', { from, channel });
    }
  });

  socket.on('disconnect', () => {
    for (const [id, sockId] of Object.entries(onlineUsers)) {
      if (sockId === socket.id) delete onlineUsers[id];
    }
  });
});

app.get('/agora-token', (req, res) => {
  const { channel, uid } = req.query;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channel, uid, role, expireTime);
  res.json({ token });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});