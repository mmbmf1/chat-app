import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log('a client is connected')
    
    socket.on('message', (data) => {
      console.log("👀 🔍 ~ io.on ~ socket.id:", socket.id)
      console.log("👀 🔍 ~ io.on ~ socket.handshake:", socket.handshake)
      console.log("👀 🔍 ~ io.on ~ SET socket.rooms:", socket.rooms)
      socket.join("room1");
      console.log("👀 🔍 ~ socket.on ~ data:", data)
      console.log("👀 🔍 ~ io.on ~ socket.rooms:", socket.rooms)
    })
    
    socket.on('disconnect', () => {
      console.log('a client disconnected')
    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});