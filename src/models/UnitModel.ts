// This is the unified model for the unit that has cloud and device data merged

import { PedalBoardIndex } from "../nation";


export type PedalBoardList = Awaited<ReturnType<typeof PedalBoardIndex.prototype.runWithinTransaction>>["data"];

export interface RoomInfo {
  name: string;
  token: string;
}

// new interface for players in the room
export interface Player {
  name: string;
  clientId: number;
  depth: number;
  networkLatency: number;
  token: string;
  city: string;
  longitude: number;
  latitude: number;
  tracks: Track[];
}
export interface Track {
  channel: number;
  level: Level;
  icon: number;
  gain: number;
  pan: number;
  mute: boolean;
}


export interface Level {
  level: number;
  peak: number;
}

export interface EffectSetting {
  index: number;
  labels: string[];
  name: string;
  max: number;
  min: number;
  step: number;
  type: number;
  units: number;
  value: number | boolean;
}
// Data to represent a single pedal
export interface PedalData {
  index: number;
  name: string;
  settings: Array<EffectSetting>;
}

// Data to represent a board
export interface BoardData {
  channel: number;
  boardId: number;
  pedals: Array<PedalData>;
}

// This is the pedal boards loaded.  It's an array (by channel) of BoardData
export type LoadedBoards = Array<BoardData>;

// This is a definition of a pedal the system can manifest
export interface PedalOption {
  label: string;
  value: string;
}

export interface BoardInfo {
  pedalOptions: Array<PedalOption>;
  loadedBoards: LoadedBoards;
}

export interface AudioHardware {
  driver: string;
  cardInfo: string;
}

export enum MidiMessageType {
  noteOff,
  noteOn,
  polyPressure,
  controlChange,
  programChange,
  channelPressure,
  pitchBend,
  systemMessage,
  unknownType,
}

export interface MidiEvent {
  channel: number;
  note: number;
  type: MidiMessageType;
  velocity: number;
}

export interface UpdateMessage {
  text: string;
  time: number;
}
export interface UnitModel {
  socketUp: boolean;
  connected: boolean;
  isRust: boolean;
  name: string;
  token: string;
  gitHash: string;
  settings: any;
  room: RoomInfo;
  masterLevel: Level;
  inputLeft: Level;
  inputRight: Level;
  roomLeft: Level;
  roomRight: Level;
  inputLeftFreq: number;
  inputRightFreq: number;
  leftTunerOn: boolean;
  rightTunerOn: boolean;
  leftRoomMute: boolean;
  rightRoomMute: boolean;
  beat: number;
  jsonTimeStamp: number;
  players: Array<Player>;
  pedalInfo: Array<Array<any>>;
  boardInfo: BoardInfo;
  cmdOutput: string;
  audioHardware: AudioHardware;
  midiEvent: MidiEvent;
  updateMsg: UpdateMessage;
}
