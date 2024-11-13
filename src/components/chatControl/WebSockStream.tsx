/// This is a u/x component that is invisible that will establish a websocket connection to the server
/// It should only appear once on the page.  It is the component that allows the chatRoomHandler to send
/// receive and distribute chat room messages.
///
/// when it is loaded on the page it will initiate a websocket connection back to the server.  It then
/// gives it's functions to the chatRoomHandler to use to join/leave rooms and to sent messages

import { useContext, useEffect, useState } from "react";

import { HandlerContext } from "../../contexts/HandlerContext";

export const WebsockStream = () => {
  // @ts-ignore
  if (!globalThis.ActionheroWebsocketClient) return null;
  const { chatRoomHandler } = useContext(HandlerContext);
  const [roomState, setRoomState] = useState<string>("connecting");
  // @ts-ignore
  const [client] = useState<any>(new globalThis.ActionheroWebsocketClient());

  useEffect(() => {
    connectToSite();
    chatRoomHandler.setFuncs(joinRoom, leaveRoom, sendMessage);
    return () => {
      console.log("unloading");
      disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(roomState);
  }, [roomState]);

  async function connectToSite() {
    if (!client || client.state === "connected") {
      return;
    }
    client.on("connected", () => {
      setRoomState("connected");
    });
    client.on("disconnected", () => {
      setRoomState("disconnected");
    });
    client.on("error", (error: any) => {
      console.log(error);
    });
    client.on("reconnect", () => {
      setRoomState("reconnect");
    });
    client.on("reconnecting", () => {
      setRoomState("reconnecting");
    });
    client.on("alert", function (message: any) {
      console.warn(message);
    });
    client.on("api", function (message: any) {
      console.warn(message);
    });
    client.on("welcome", (_message: any) => {
      // console.warn(message);
    });
    client.on("say", function (e: any) {
      // console.log(e);
      const { context, from, room, sentAt, message } = e;
      chatRoomHandler.distribute(context, from, room, sentAt, message);
    });

    client.connect(function (error: any, _details: any) {
      if (error) {
        console.error(error);
      }
    });
  }

  async function disconnect() {
    await client.disconnect();
  }

  async function joinRoom(token: string) {
    client.roomAdd(token);
  }
  async function leaveRoom(token: string) {
    client.roomLeave(token);
  }
  function sendMessage(token: string, message: any) {
    if (client.state === "connected") {
      client.say(token, JSON.stringify(message));
    }
  }

  return <div className="WebsockEventFetcher" />;
};
