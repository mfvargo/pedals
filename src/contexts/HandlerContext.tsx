import React, { createContext, ReactNode, useState } from "react";
import { ErrorHandler } from "../utils/errorHandler";
import { SuccessHandler } from "../utils/successHandler";
import { SessionHandler } from "../utils/sessionHandler";
import { JamUnitHandler } from "../utils/jamUnitHandler";
import { RoomHandler } from "../utils/roomHandler";
import { ChatRoomHandler } from "../utils/ChatRoomHandler";
import { ConfigHandler } from "../utils/ConfigHandler";

type HandlerContextObj = {
  errorHandler: ErrorHandler;
  successHandler: SuccessHandler;
  sessionHandler: SessionHandler;
  jamUnitHandler: JamUnitHandler;
  roomHandler: RoomHandler;
  chatRoomHandler: ChatRoomHandler;
  configHandler: ConfigHandler;
};

const HandlerContext = createContext<HandlerContextObj>({
  errorHandler: new ErrorHandler(),
  successHandler: new SuccessHandler(),
  sessionHandler: new SessionHandler(),
  jamUnitHandler: new JamUnitHandler(),
  roomHandler: new RoomHandler(),
  chatRoomHandler: new ChatRoomHandler(),
  configHandler: new ConfigHandler(),
});

type HandlerContextProviderProps = {
  children: ReactNode;
};

const HandlerContextProvider: React.FC<HandlerContextProviderProps> = (props) => {
  const [errorHandler] = useState(new ErrorHandler());
  const [successHandler] = useState(new SuccessHandler());
  const [sessionHandler] = useState(new SessionHandler());
  const [jamUnitHandler] = useState(new JamUnitHandler());
  const [roomHandler] = useState(new RoomHandler());
  const [chatRoomHandler] = useState(new ChatRoomHandler());
  const [configHandler] = useState(new ConfigHandler());

  const contextValue: HandlerContextObj = {
    errorHandler,
    successHandler,
    sessionHandler,
    jamUnitHandler,
    roomHandler,
    chatRoomHandler,
    configHandler,
  };

  return <HandlerContext.Provider value={contextValue}>{props.children}</HandlerContext.Provider>;
};

export { HandlerContext, HandlerContextProvider };
export type { HandlerContextObj };
