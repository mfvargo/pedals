/// This handler consolidates data related to the jamUnit (see UnitModel) from various
/// sources and distributes it to components that have registered to receive updates.
/// Since the various parts of a jamUnit's data are moving at very different rates
/// it allows subscribers to register for various "topics" related to the jamUnit.  So
/// if you are just concerned about PedalBoards you can register just for the "boards"
/// topic and you will only get updated about those things.  Level updates etc will not
/// call you with unneeded data.
///
/// lastly this handler is connected to the websocket and can speak command language to
/// the jamUnit to expose it's api.  this is via the sendMessage function in the unitChat
/// element.  This will prepend the room to the message so it gets to the right unit.
import { EventDispatcher } from "./eventDispatcher";
import { Player, RoomInfo, UnitModel, BoardData, UpdateMessage, MidiMessageType } from "../models/UnitModel";
// import { Player as PlayerModel } from "../../api/src/models/Player";
import { JamUnitShow, Player as PlayerModel, RoomShow } from "../nation";
// import { RoomShow } from "../../api/src/actions/Room";
// import { JamUnitShow } from "../../api/src/actions/JamUnit";

type PlayerData = Awaited<ReturnType<typeof PlayerModel.prototype.apiData>>;
type RoomModelData = Awaited<ReturnType<typeof RoomShow.prototype.runWithinTransaction>>["room"];
type JamUnitData = Awaited<ReturnType<typeof JamUnitShow.prototype.runWithinTransaction>>["jamUnit"];

export enum RTJamParameters {
  paramChanGain1 = 0,
  paramChanGain2,
  paramChanGain3,
  paramChanGain4,
  paramChanGain5,
  paramChanGain6,
  paramChanGain7,
  paramChanGain8,
  paramChanGain9,
  paramChanGain10,
  paramChanGain11,
  paramChanGain12,
  paramChanGain13,
  paramChanGain14,
  paramMasterVol,
  paramInputMonitor,
  paramRoom0,
  paramRoom1,
  paramRoom2,
  paramReverbChanOne,
  paramReverbMix,
  paramRoomChange,
  paramDisconnect,
  paramHPFOn_dep, // Deprecated
  paramHPFOff_dep, // Deprecated
  paramReverbOne_dep, // Deprecated
  paramReverbTwo_dep, // Deprecated
  paramGetConfigJson,
  paramSetEffectConfig,
  paramInsertPedal,
  paramDeletePedal,
  paramMovePedal,
  paramLoadBoard,
  paramTuneChannel,
  paramMetronomeVolume,
  paramSetFader,
  paramMuteToRoom,
  paramConnectionKeepAlive,
  paramSetBufferSize,
  paramChannelMute,
  paramChannelGain,
  paramCount,
  paramSetAudioInput = 1000,
  paramSetAudioOutput,
  paramListAudioConfig,
  paramCheckForUpdate,
  paramRandomCommand,
  paramGetPedalTypes,
  paramSetUpdateInterval,
  paramRebootDevice = 9998,
  paramShutdownDevice = 9999,
}

export interface MidiEvent {
  type: number;
  channel: number;
  note: number;
  velocity: number;
}

interface Dispatchers {
  unit: EventDispatcher;
  levels: EventDispatcher;
  boards: EventDispatcher;
  midi: EventDispatcher;
}

interface Latency {
  clientId: number;
  latency: number;
}

export class JamUnitHandler {
  lastHeardFrom: Date;
  unitInfo!: JamUnitData; // used to keep the jam units info
  roomInfo!: RoomModelData; // used to map clientId to player name
  updatedModel: UnitModel; // Aggregate data model of the unit
  apiFunction: any; // Function to call to send api requests
  reloadFunction: any; // Function to reload the unit data from cloud
  // event dispatchers organized by topic
  dispatchers: Dispatchers;
  latencies: Latency[];

  constructor() {
    this.apiFunction = console.log;
    this.reloadFunction = console.log;
    this.lastHeardFrom = new Date();
    this.dispatchers = {
      unit: new EventDispatcher(),
      levels: new EventDispatcher(),
      boards: new EventDispatcher(),
      midi: new EventDispatcher(),
    };
    this.updatedModel = {
      socketUp: false,
      connected: false,
      isRust: false,
      name: "loading",
      token: "",
      gitHash: "",
      settings: {},
      room: { name: "", token: ""},
      masterLevel: { level: -60, peak: -60 },
      inputLeft: { level: -60, peak: -60 },
      inputRight: { level: -60, peak: -60 },
      roomLeft: { level: -60, peak: -60 },
      roomRight: { level: -60, peak: -60 },
      inputLeftFreq: 0.0,
      inputRightFreq: 0.0,
      leftTunerOn: false,
      rightTunerOn: false,
      leftRoomMute: false,
      rightRoomMute: false,
      beat: 0,
      jsonTimeStamp: 0,
      players: [],
      pedalInfo: [[], []],
      boardInfo: {
        pedalOptions: [],
        loadedBoards: [
          { channel: 0, boardId: -1, pedals: [] },
          { channel: 1, boardId: -1, pedals: [] },
        ],
      },
      cmdOutput: "",
      audioHardware: {
        driver: "",
        cardInfo: "",
      },
      midiEvent: {
        channel: 0,
        note: 0,
        type: MidiMessageType.unknownType,
        velocity: 0,
      },
      updateMsg: {
        text: "",
        time: 0,
      },
    };
    this.latencies = [];
  }

  setApiFunction(apiFunction: { (msg: any): void; (...data: any[]): void; }, reloadFunction: (() => Promise<void>) | null) {
    this.apiFunction = apiFunction;
    this.reloadFunction = reloadFunction;
  }

  setSocketUp(socketUp: boolean) {
    this.updatedModel.socketUp = socketUp;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setRoomData(room: RoomInfo) {
    this.updatedModel.room = room;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setRoomInfo(roomInfo: RoomModelData) {
    this.roomInfo = roomInfo;
  }

  setJamUnitData(jamUnitInfo: JamUnitData) {
    this.unitInfo = jamUnitInfo;
    this.updatedModel.gitHash = jamUnitInfo.gitHash;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setUnitName(name: string, token: string) {
    this.updatedModel.name = name;
    this.updatedModel.token = token;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setUnitSettings(settings: any) {
    this.updatedModel.settings = settings;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setUpdateMsg(updateMsg: UpdateMessage) {
    this.updatedModel.updateMsg = updateMsg;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setLatencies(latencies: Latency[]) {
    this.latencies = latencies;
  }

  setLoadedBoards(loadedBoards: BoardData[]) {
    this.updatedModel.boardInfo.loadedBoards = loadedBoards;
    this.dispatchers.boards.publish(this.updatedModel);
  }

  setMidiEvent(midiEvent: MidiEvent) {
    this.updatedModel.midiEvent = midiEvent;
    this.dispatchers.midi.publish(this.updatedModel);
  }

  setPedalTypes(pedalOptions: { value: string; label: any; }[]) {
    this.updatedModel.boardInfo.pedalOptions = pedalOptions;
  }

  setCmdOutput(cmdOutput: string) {
    this.updatedModel.cmdOutput = cmdOutput;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setAudioHardware(driver: any, cardInfo: any) {
    this.updatedModel.audioHardware = {
      driver: driver,
      cardInfo: cardInfo,
    };
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setRustIndicator() {
    this.updatedModel.isRust = true;
    this.dispatchers.unit.publish(this.updatedModel);
  }

  setLevels(r: { players: any[]; connected: boolean; beat: number; masterLevel: any; peakMaster: any; inputLeft: any; peakLeft: any; inputRight: any; peakRight: any; roomInputLeft: any; roomPeakLeft: any; roomInputRight: any; roomPeakRight: any; inputLeftFreq: number; inputRightFreq: number; leftTunerOn: boolean; rightTunerOn: boolean; leftRoomMute: boolean; rightRoomMute: boolean; jsonTimeStamp: number; }) {
    // add the channel to the players
    // console.log(r);
    const players: Player[] = r.players
      .map((p: any, idx: any) => {
        return this.mergePlayers(p, idx);
      })
      .filter((p: { clientId: number; }) => p.clientId !== 40000 && p.clientId !== 0);
    this.updatedModel.connected = r.connected;
    this.updatedModel.beat = r.beat;
    // Don't do this because there is no githash in the levels...
    // this.updatedModel.gitHash = r.githash;
    this.updatedModel.masterLevel = { level: r.masterLevel, peak: r.peakMaster };
    this.updatedModel.inputLeft = { level: r.inputLeft, peak: r.peakLeft };
    this.updatedModel.inputRight = { level: r.inputRight, peak: r.peakRight };
    this.updatedModel.roomLeft = { level: r.roomInputLeft, peak: r.roomPeakLeft };
    this.updatedModel.roomRight = { level: r.roomInputRight, peak: r.roomPeakRight };
    this.updatedModel.inputLeftFreq = r.inputLeftFreq || 0;
    this.updatedModel.inputRightFreq = r.inputRightFreq || 0;
    this.updatedModel.leftTunerOn = r.leftTunerOn;
    this.updatedModel.rightTunerOn = r.rightTunerOn;
    this.updatedModel.leftRoomMute = r.leftRoomMute;
    this.updatedModel.rightRoomMute = r.rightRoomMute;
    this.updatedModel.jsonTimeStamp = r.jsonTimeStamp;
    this.updatedModel.players = players;
    // console.log(this.updatedModel);
    this.dispatchers.levels.publish(this.updatedModel);
  }

  // This function will merge data from two sources.  One is the jamUnit itself which is
  // giving us frequent updates of things it knows about (volume levels, etc).  The
  // second data source is from the cloud telling us about the Player in the room (things
  // that the jam Unit knows nothing about).
  mergePlayers(pLevelData: { clientId: number; depth: any; level0: any; peak0: any; gain0: any; fade0: any; mute0: any; level1: any; peak1: any; gain1: any; fade1: any; mute1: any; }, idx: number): Player {
    // First build a Member with data from the jamUnit
    const rval: Player = {
      name: "No name found",
      clientId: pLevelData.clientId,
      depth: pLevelData.depth,
      networkLatency: 0,
      token: "",
      city: "",
      longitude: 0,
      latitude: 0,
      tracks: [
        {
          channel: idx * 2,
          level:  { level: pLevelData.level0, peak: pLevelData.peak0 },
          icon: 0,
          gain: pLevelData.gain0,
          pan: pLevelData.fade0,
          mute: pLevelData.mute0,
        },
        {
          channel: idx * 2 + 1,
          level:  { level: pLevelData.level1, peak: pLevelData.peak1 },
          icon: 0,
          gain: pLevelData.gain1,
          pan: pLevelData.fade1,
          mute: pLevelData.mute1,
        },
      ],
    };
    // Now merge in data from the Player record in the cloud if you are in a room!
    if (this.roomInfo) {
      const foundPlayer = this.roomInfo.players.find((p) => p.clientId === pLevelData.clientId);
      if (foundPlayer) {
        rval.name = foundPlayer.name;
        rval.tracks[0].icon = foundPlayer.chanOneIcon;
        rval.tracks[1].icon = foundPlayer.chanTwoIcon;
        rval.token = foundPlayer.token;
        rval.city = foundPlayer.city;
        rval.longitude = foundPlayer.longitude;
        rval.latitude = foundPlayer.latitude;
      } else {
        // TODO:  This is a hack.  The room playback is hardcoded to this client ID.  all the rest
        // of the metadata is the default
        if (pLevelData.clientId === 40001) {
          rval.name = "Room Playback";
        }
      }
    } else if (idx == 0 && this.unitInfo) {
      // this is the local guy and we are not in a room.
      rval.name = this.unitInfo.name;
      rval.tracks[0].icon = this.unitInfo.chanOneIcon;
      rval.tracks[1].icon = this.unitInfo.chanTwoIcon;
      rval.token = this.unitInfo.token;
      rval.city = this.unitInfo.city;
      rval.longitude = this.unitInfo.longitude;
      rval.latitude = this.unitInfo.latitude;
    }
    // Lastly mix in any latency data from the room
    const latency = this.latencies.find((l) => l.clientId === rval.clientId);
    rval.networkLatency = latency ? latency.latency : 0;
    return rval;
  }

  getPlayerName(clientId: number, idx: number) {
    if (this.roomInfo) {
      const foundPlayer = this.roomInfo.players.find((p) => p.clientId === clientId);
      return foundPlayer ? foundPlayer.name : "No player found";
    }
    if (idx == 0) {
      // this is the local guy and we are not in a room.
      return this.updatedModel.name;
    }
    return "No name found";
  }

  // Subsscription Functions
  subscribe(topic: "unit" | "levels" | "boards" | "midi", keyName: string, callbackFunc: any) {
    this.dispatchers[topic].subscribe(keyName, callbackFunc);
  }

  unsubscribe(topic: "unit" | "levels" | "boards" | "midi", keyName: string) {
    this.dispatchers[topic].unsubscribe(keyName);
  }

  // API functions

  reloadUnitInfo() {
    if (this.reloadFunction) {
      this.reloadFunction();
    }
  }

  dumpModelToConsole() {
    console.log(this.updatedModel);
    console.log(this.roomInfo);
  }

  setUpdateInterval(msec: number) {
    this.apiFunction({ param: RTJamParameters.paramSetUpdateInterval, iValue1: msec });
  }

  setConnectionKeepAlive() {
    this.apiFunction({ param: RTJamParameters.paramConnectionKeepAlive });
  }

  setBufferSize(size: number) {
    this.apiFunction({
      param: RTJamParameters.paramSetBufferSize,
      iValue1: size,
    });
  }

  // This sets the volume on a particular mixer channel
  setMasterVolume(volume: number) {
      this.apiFunction({
        param: RTJamParameters.paramMasterVol,
        fValue: volume,
      });
  }
  
  // This sets the volume on a particular mixer channel
  setVolume(channel: number, volume: number) {
    if (channel >= 0 && channel <= RTJamParameters.paramMasterVol) {
      this.apiFunction({
        param: RTJamParameters.paramChannelGain,
        iValue1: channel,
        fValue: volume,
      });
    }
  }

  // This sets the pan value on a particular channel
  setFader(channel: number, value: number) {
    if (channel >= 0 && channel <= RTJamParameters.paramMasterVol) {
      this.apiFunction({
        param: RTJamParameters.paramSetFader,
        iValue1: channel,
        fValue: value,
      });
    }
  }

  // This will set the mute on a partiular channel
  setMute(channel: number, isOn: boolean) {
    if (channel >= 0 && channel <= RTJamParameters.paramMasterVol) {
      this.apiFunction({
        param: RTJamParameters.paramChannelMute,
        iValue1: channel,
        iValue2: isOn ? 1 : 0,
      });
    }
  }

  // This causes the jamUnit to toggle sending any audio signal to the room
  roomMute(channel: number, isOn: boolean) {
    this.apiFunction({
      param: RTJamParameters.paramMuteToRoom,
      iValue1: channel,
      iValue2: isOn ? 1 : 0,
    });
  }


  refreshPedalConfig() {
    this.apiFunction({ param: RTJamParameters.paramGetConfigJson });
  }

  setEffectSetting(channel: number, effect: number, name: string, value: any) {
    const setting = {
      name: name,
      value: value,
    };
    this.apiFunction({
      param: RTJamParameters.paramSetEffectConfig,
      sValue: JSON.stringify(setting),
      iValue1: channel,
      iValue2: effect,
    });
  }

  getPedalTypes() {
    this.apiFunction({ param: RTJamParameters.paramGetPedalTypes });
  }

  insertPedal(channel: number, idx: number, pedalType: string) {
    this.apiFunction({
      param: RTJamParameters.paramInsertPedal,
      sValue: pedalType,
      iValue1: channel,
      iValue2: idx,
    });
  }

  deletePedal(channel: number, idx: number) {
    this.apiFunction({
      param: RTJamParameters.paramDeletePedal,
      iValue1: channel,
      iValue2: idx,
    });
  }

  tunerOn(channel: number, isOn: boolean) {
    this.apiFunction({
      param: RTJamParameters.paramTuneChannel,
      iValue1: channel,
      iValue2: isOn ? 1 : 0,
    });
  }

  movePedal(channel: number, fromIdx: number, toIdx: number) {
    this.apiFunction({
      param: RTJamParameters.paramMovePedal,
      fValue: toIdx,
      iValue1: channel,
      iValue2: fromIdx,
    });
  }

  loadBoardFromConfig(channel: number, config: { id: any; name?: string; config: never[]; }) {
    this.apiFunction({
      param: RTJamParameters.paramLoadBoard,
      iValue1: channel,
      sValue: JSON.stringify(config),
    });
  }

  joinRoom(player: PlayerData) {
    this.apiFunction({
      param: RTJamParameters.paramRoomChange,
      sValue: player.room.wanIp,
      iValue1: player.room.port,
      iValue2: player.clientId,
    });
  }

  disconnect() {
    this.apiFunction({
      param: RTJamParameters.paramDisconnect,
    });
  }

  setMetronomeConfig(soundType: number, volume: number) {
    this.apiFunction({
      param: RTJamParameters.paramMetronomeVolume,
      iValue1: soundType,
      fValue: volume,
    });
  }

  // TODO:  have this create an event to show hardware info
  getAudioHardwareInfo() {
    this.apiFunction({
      param: RTJamParameters.paramListAudioConfig,
    });
  }

  setAudioInputHardware(value: string) {
    this.apiFunction({
      param: RTJamParameters.paramSetAudioInput,
      sValue: value,
    });
  }

  setAudioOutputHardware(value: string) {
    this.apiFunction({
      param: RTJamParameters.paramSetAudioOutput,
      sValue: value,
    });
  }

  updateCheck() {
    this.apiFunction({
      param: RTJamParameters.paramCheckForUpdate,
    });
  }

  rebootDevice() {
    this.apiFunction({
      param: RTJamParameters.paramRebootDevice,
    });
  }

  shutdownDevice() {
    this.apiFunction({
      param: RTJamParameters.paramShutdownDevice,
    });
  }

  deviceCommand(cmd: string) {
    this.apiFunction({
      param: RTJamParameters.paramRandomCommand,
      sValue: cmd,
    });
  }
}
