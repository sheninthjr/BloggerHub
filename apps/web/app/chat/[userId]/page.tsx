"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userDetails } from "../../../../../packages/store/atoms/userDetails";

const page = ({ params }: { params: { userId: string } }) => {
  const [message, setMessage] = useState<string>("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [server, setServer] = useState<
    { message: string; senderId: string; timestamp: string }[]
  >([]);
  const messagesContainerRef = useRef(null);
  const userState = useRecoilValue(userDetails);

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
            roomId: 2,
            senderId: userState.id,
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
            senderId: userState.id,
            timestamp: formattedTime,
          },
        })
      );
      setMessage("");
    }
  };
  useEffect(() => {
    if (messagesContainerRef.current) {
      //@ts-ignore
      messagesContainerRef.current.scrollTop =
        //@ts-ignore
        messagesContainerRef.current.scrollHeight;
    }
  }, [server]);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-1/3 overflow-x-hidden">
        <div
          className="flex flex-col justify-end p-2 h-screen w-full bg-gray-900 text-black"
          ref={messagesContainerRef}
        >
          {server.map((messages, index) => (
            <div
              className={`chat space-y-2 ${
                messages.senderId === userState.id
                  ? "chat-end justify-end items-end"
                  : "chat-start justify-start items-start"
              }`}
              key={index}
            >
              <div
                className={`chat-bubble rounded-lg ${
                  messages.senderId === userState.id
                    ? "bg-slate-800 text-white self"
                    : "bg-gray-200 text-black other"
                }`}
                style={{ wordWrap: "break-word" }}
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
          <div className="flex justify-between p-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              onKeyPress={handleKeyPress}
              className="w-full bg-slate-800 border relative z-10 border-black focus:bg-slate-800 focus:outline-none text-white rounded-lg px-4 py-2"
            />
            <button
              onClick={handleMessage}
              className="bg-slate-900 w-10 text-white rounded-xl ml-4 text-3xl"
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
