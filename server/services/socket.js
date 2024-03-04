import { Server } from "socket.io";
import { createServer } from "http";

let io;

const initializeSocket = (app) => {
  const server = createServer(app);
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("panic button", (msg, callback) => {
      console.log(msg);
      io.emit("panic button", msg);
    });
    socket.on("out of range", (guardId, callback) => {
      console.log(guardId);
      io.emit("out of range", {
        guardId: guardId,
        id: socket.id,
      });
    });
  });

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });

  return io;
};

export default initializeSocket;
