/// Handler for the WebSockStream u/x element.  This handler will distribute messages to the suscribers
/// to chat rooms hosted on the server.
///
/// so websocket messages arriving in the WebSockStream are distributed in the distribute function
/// here.  This handler also will cause the websocket to join/leave rooms on the server when
/// subscriptions are made/deleted.
///
/// NOTE: all of the rooms that are to be joined are represented by the tokens of jamUnits or broadcastUnits
/// that have connected.  So no room create logic is in here as the units will create their rooms when
/// they register with the rtjam-nation.
import { EventDispatcher } from "./eventDispatcher";

export class ChatRoomHandler {
  dispatchers: {
    [key: string]: EventDispatcher;
  };
  connectFunc: any;
  disconnectFunc: any;
  sendFunc: any;

  constructor() {
    this.dispatchers = {};
    this.connectFunc = console.log;
    this.disconnectFunc = console.log;
    this.sendFunc = console.log;
  }

  setFuncs(connect: any, disconnect: any, send: any) {
    this.connectFunc = connect;
    this.disconnectFunc = disconnect;
    this.sendFunc = send;
  }

  subscribe(roomToken: string, keyName: string, callbackFunc: any) {
    if (!this.dispatchers[roomToken]) {
      this.dispatchers[roomToken] = new EventDispatcher();
      // Need to tell the WebSockStream to join a room
      this.connectFunc(roomToken);
    }
    this.dispatchers[roomToken].subscribe(keyName, callbackFunc);
  }
  unsubscribe(roomToken: string, keyName: string) {
    this.dispatchers[roomToken]?.unsubscribe(keyName);
    if (this.dispatchers[roomToken]?.isEmpty()) {
      // Need to tell WebSockStream to leave the room
      delete this.dispatchers[roomToken];
      this.disconnectFunc(roomToken);
    }
  }
  distribute(_context: any, _from: any, room: any, _sentAt: any, message: any) {
    this.dispatchers[room]?.publish(message);
  }
}
