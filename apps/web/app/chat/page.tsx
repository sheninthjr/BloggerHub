"use client";
import { Elsie_Swash_Caps } from "next/font/google";
import React, { useEffect, useState } from "react";

const page = () => {
  const [message, setMessage] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [server, setServer] = useState([]);
  const [userId, setUserId] = useState("2f304fc4-36ca-4d38-9b72-e51d96192eda")
  const [serverId, setServerId] = useState();
  let id = true;
  if (userId === serverId) {
    id = true;
  }
  else {
    id = false;
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function(event) {
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
    setWebSocket(ws)
  }, []);
  const handleMessage = () => {
    if (webSocket) {
      //@ts-ignore
      webSocket.send(
        JSON.stringify({
          type: "message",
          payload: {
            message: message,
            userId: userId
          }
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
        <div>{
          id ? (
            <div className="flex flex-col justify-end items-end pb-4 pl-4 bg-white w-96 h-screen" >
              {server.map((messages, index) => (
                <p key={index} className="text-black">{messages}</p>
              ))}
            </div>
          ) : (<div className="flex flex-col justify-end items-start pb-4 pr-4 bg-white w-96 h-screen" >
            {server.map((messages, index) => (
              <p key={index} className="text-black">{messages}</p>
            ))}
          </div>
          )}
        </div >
      </div >
    </>
  );
}

export default page;
