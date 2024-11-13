/// This handler collects and distributes data related to the broadcastUnit room
/// to components that have registered to receive updates.
///
/// lastly this handler is connected to the websocket and can speak command language to
/// the broadcastUnit to expose it's api.  this is via the sendMessage function in the roomChat
/// element.  This will prepend the room to the message so it gets to the right chat room.
import { RoomShow } from "../nation";
import { EventDispatcher } from "./eventDispatcher";

type RoomModelData = Awaited<ReturnType<typeof RoomShow.prototype.runWithinTransaction>>["room"];

export enum RoomParam {
  GetTempo = 0,
  SetTempo,
  Record,
  Pause,
  Stop,
  Play,
  ListFiles,
  SaveRecording,
  DeleteRecording,
}

export interface Recording {
  date: string;
  name: string;
  size: number;
}

interface TransportStatus {
  state: "idle" | "recording" | "playing";
  current_file: Recording;
}

export interface RoomHandlerData {
  transport: TransportStatus;
  roomInfo: RoomModelData;
  peerMessage: any;
  recordings: Recording[];
}

export class RoomHandler {
  data: RoomHandlerData;
  lastHeardFrom: Date;
  apiFunction: any; // Function to call to send api requests to broadcast server
  peerFunction: any; // Function send messages to others in the room
  dispatcher: EventDispatcher;

  constructor() {
    this.apiFunction = console.log;
    this.lastHeardFrom = new Date();
    this.dispatcher = new EventDispatcher();
    this.data = {
      transport: {
        state: "idle",
        // @ts-ignore
        current_file: null,
      },
      // @ts-ignore
      roomInfo: null,
      peerMessage: null,
      recordings: [],
    };
  }

  setApiFunction(apiFunction: any) {
    this.apiFunction = apiFunction;
  }

  // Subsscription Functions
  subscribe(keyName: string, callbackFunc: any) {
    this.dispatcher.subscribe(keyName, callbackFunc);
  }

  unsubscribe(keyName: string) {
    this.dispatcher.unsubscribe(keyName);
  }

  // Set functions used to save data in the handler
  setRoomInfo(roomInfo: RoomModelData) {
    this.data.roomInfo = roomInfo;
    this.dispatcher.publish(this.data);
  }
  setTransportstatus(status: TransportStatus) {
    this.data.transport = status;
    this.dispatcher.publish(this.data);
  }
  setPeerMessage(msg: any) {
    this.data.peerMessage = msg;
    this.dispatcher.publish(this.data);
  }
  setRecordings(recordings: Recording[]) {
    this.data.recordings = recordings;
    this.dispatcher.publish(this.data);
  }

  // API functions
  getTempo() {
    this.apiFunction({
      param: RoomParam.SetTempo,
    });
  }
  setTempo(tempo: number) {
    this.apiFunction({
      param: RoomParam.SetTempo,
      iValue1: tempo,
    });
  }
  recordRoom() {
    this.apiFunction({
      param: RoomParam.Record,
    });
  }
  stopAudio() {
    this.apiFunction({
      param: RoomParam.Stop,
    });
  }
  playAudio(name: String, loop: number) {
    this.apiFunction({
      param: RoomParam.Play,
      iValue1: loop,
      sValue: name,
    });
  }
  listFiles() {
    this.apiFunction({
      param: RoomParam.ListFiles,
    });
  }
  saveRecording() {
    this.apiFunction({
      param: RoomParam.SaveRecording,
    });
  }
  deleteRecording(name: String) {
    this.apiFunction({
      param: RoomParam.DeleteRecording,
      sValue: name,
    });
  }
  sendPeerMessage(msg: any) {
    this.apiFunction(msg);
  }
}
