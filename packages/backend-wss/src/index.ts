import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
import { PrismaClient } from "@prisma/client";
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const app = express();
const PORT = 8080;

const server = http.createServer(app);

const wss = new WebSocketServer({ server })

const users: {
  [key: string]: {
    room: string,
    senderId: string,
    receiverId: string,
    ws: any
  }
} = {}

const userMessage: {
  [userId: string]: {
    message: [string]
  }
} = {};

let counter = 0;
wss.on("connection", async (ws) => {
  const wsId = counter++;
  ws.on("message", async (message: string) => {
    const data = JSON.parse(message.toString());
    if (data.type === "join") {
      users[wsId] = {
        room: data.payload.roomId,
        senderId: data.payload.senderId,
        receiverId: data.payload.receiverId,
        ws
      }
      const existing = await prisma.chatUser.findFirst({
        where: {
          AND: [
            { senderId: data.payload.senderId },
            { receiverId: data.payload.receiverId },
          ],
        }
      })
      if (!existing) {
        await prisma.chatUser.create({
          data: {
            id: randomUUID(),
            senderId: data.payload.senderId,
            receiverId: data.payload.receiverId
          }
        })
      }
    }
    if (data.type === "message") {
      const message = data.payload.message;
      const userId = data.payload.userId;
      const roomId = users[wsId].room;
      userMessage[userId] = message;
      const existing = await prisma.chatUser.findFirst({
        where: {
          AND: [
            { senderId: data.payload.senderId },
            { receiverId: data.payload.receiverId },
          ],
        }
      })
      if (existing) {
        await prisma.message.create({
          data:{
            authorId: userId,
            message:message
          }
        })
      }
      Object.keys(users).forEach((wsId) => {
        if (users[wsId].room === roomId) {
          users[wsId].ws.send(JSON.stringify({
            type: "message",
            payload: {
              message,
              userId
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
