import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'

const app = express();
const PORT = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server })

const users: {
  [key: string]: {
    room: string,
    ws: any
  }
} = {}

let counter = 0;
wss.on("connection", async (ws) => {
  const wsId = counter++;
  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());
    if (data.type === "join") {
      users[wsId] = {
        room: data.payload.roomId,
        ws
      }
    }
    if (data.type === "message") {
      const message = data.payload.message;
      const roomId = users[wsId].room;
      Object.keys(users).forEach((wsId) => {
        if (users[wsId].room === roomId) {
          users[wsId].ws.send(JSON.stringify({
            type: "message",
            payload: {
              message
            }
          }))
        }
      })
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
