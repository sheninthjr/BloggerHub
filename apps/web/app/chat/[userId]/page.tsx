"use client";

import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { userId: string } }) => {
  const [message, setMessage] = useState<string>("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [server, setServer] = useState([]);
  const [userId, setUserId] = useState<string>(
    "2f304fc4-36ca-4d38-9b72-e51d96192eda"
  );
  const [serverId, setServerId] = useState<string>("");

  let id = true;

  if (params.userId === serverId) {
    id = true;
  } else {
    id = false;
  }


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setServerId(data.payload.userId);
        setServer((p): any => [...p, data.payload.message]);
      }
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: 1,
            senderId: userId,
            receiverId: params.userId
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
      webSocket.send(
        JSON.stringify({
          type: "message",
          payload: {
            message: message,
            senderId: userId,
            receiverId: params.userId
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
              {server.map((messages, index) => (
                <div key={index} className="chat-bubble">
                  {messages}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-end items-start p-2 h-screen w-1/2 bg-white text-black">
            <div className="chat chat-start space-y-2">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span className="text-3xl">D</span>
                </div>
              </div>
              {server.map((messages, index) => (
                <div key={index} className="chat-bubble">
                  {messages}
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
