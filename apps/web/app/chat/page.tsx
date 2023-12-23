"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [message, setMessage] = useState("");
  const [webSocket, setWebSocket] = useState(null);
  const [server, setServer] = useState([]);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setServer((p): any => [...p, data.payload.message]);
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
                message: message 
            } 
        })
      );
      console.log(message)
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
        <div>
            {server.map((messages,index)=>(
                <p  key={index} className="text-white">{messages}</p>
            ))}
        </div>
      </div>
    </>
  );
};

export default page;
