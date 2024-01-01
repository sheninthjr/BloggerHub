"use client";

import React, { use, useEffect, useState } from "react";

const page = ({ params }: { params: { userId: string } }) => {
  const [message, setMessage] = useState<string>("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [server, setServer] = useState<
    { message: string; senderId: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setServer((prevMessages): any => [
          ...prevMessages,
          {
            message: data.payload.message,
            senderId: data.payload.senderId,
            timestamp: data.payload.timestamp,
          },
        ]);
      }
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: 1,
            senderId: params.userId,
          },
        })
      );
    };
    //@ts-ignore
    setWebSocket(ws);
  }, [params.userId]);

  const handleMessage = () => {
    if (webSocket) {
      //@ts-ignore
      const currentTimestamp = new Date();
      const hours = currentTimestamp.getHours();
      const minutes = currentTimestamp.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${ampm}`;
      webSocket.send(
        JSON.stringify({
          type: "message",
          payload: {
            message: message,
            senderId: params.userId,
            timestamp: formattedTime,
          },
        })
      );
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen bg-base-100">
        <div className="flex flex-col justify-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white rounded-lg h-10 text-black p-2"
          />
          <button onClick={handleMessage}>Send</button>
        </div>
        <div className="flex flex-col justify-end p-2 h-screen w-1/2 bg-white text-black">
          {server.map((messages, index) => (
            <div
              className={`chat space-y-2 ${
                messages.senderId === params.userId
                  ? "chat-end justify-end items-end"
                  : "chat-start justify-start items-start"
              }`}
            >
              <div
                key={index}
                className={`chat-bubble rounded-lg ${
                  messages.senderId === params.userId
                    ? "bg-black-500 text-white self"
                    : "bg-gray-300 text-black other"
                }`}
              >
                {messages.message}
                <div className="chat-footer flex justify-end items-end">
                  <time className="text-xs opacity-50">
                    {messages.timestamp}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
