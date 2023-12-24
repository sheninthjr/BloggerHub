"use client";
import { Elsie_Swash_Caps } from "next/font/google";
import React, { useEffect, useState } from "react";

const page = () => {
  const [message, setMessage] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [server, setServer] = useState([]);
  const [userId, setUserId] = useState("2f304fc4-36ca-4d38-9b72-e51d96192eda");
  const [serverId, setServerId] = useState();
  let id = true;
  if (userId === serverId) {
    id = true;
  } else {
    id = false;
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setServer((p): any => [...p, data.payload.message]);
        setServerId(data.payload.userId);
      }
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: 1,
          },
        })
      );
    };
    //@ts-ignore
    setWebSocket(ws);
  }, []);
  const handleMessage = () => {
    if (webSocket) {
      //@ts-ignore
      webSocket.send(
        JSON.stringify({
          type: "message",
          payload: {
            message: message,
            userId: userId,
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
        <div className="flex flex-col h-screen w-1/2 bg-white justify-end items-end text-black">
          {true ? (
            <div className="chat chat-end space-y-2">
              <div className="chat-image avatar pr-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              {server.map((messages, index) => (
                <div key={index} className="chat-bubble">
                  {messages}
                </div>
              ))}
            </div>
          ) : (
            <div className="chat-start space-y-2">
              <div className="chat-image avatar pl-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              {server.map((messages, index) => (
                <div key={index} className="chat-bubble">
                  {messages}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
