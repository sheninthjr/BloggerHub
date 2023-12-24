"use client";

import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { userId: string } }) => {
  const [message, setMessage] = useState<string>("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [userId, setUserId] = useState<string>("2f304fc4-36ca-4d38-9b72-e51d96192eda");
  const [serverId, setServerId] = useState<string>('');
  let id = true;

  if (userId === serverId) {
    id = true;
  } else {
    id = false;
  }

  const userMessage: { [userID: string]: { messages: string } } = {};

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setServerId(data.payload.userId);
        userMessage[data.payload.userId] = { messages: data.payload.message };
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
            userId: params.userId,
          },
        })
      );
      userMessage[params.userId] = { messages: message };
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
        {id ? (
          <div className="flex flex-col justify-end items-end p-2 h-screen w-1/2 bg-white text-black">
            <div className="chat chat-end space-y-2">
              <div className="chat-image avatar pr-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              {Object.keys(userMessage).map((userId) => (
                <div key={userId} className="chat-bubble">
                  {userMessage[userId].messages}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-end items-start p-2 h-screen w-1/2 bg-white text-black">
            <div className="chat chat-start space-y-2">
              <div className="chat-image avatar pl-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              {Object.keys(userMessage).map((userId) => (
                <div key={userId} className="chat-bubble">
                  {userMessage[userId].messages}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
