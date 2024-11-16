/// This invisible u/x element will start up the jamUnit
/// Is responsible for collecting data associated with the jamUnit from channel messages
/// and from the cloud (unit data, player data, pedalBoards, etc.)
///
/// There should only ever be one of these on a page...
import { useContext, useEffect, useState } from "react";

import { useApi } from "../../hooks/useApi";
import { HandlerContext } from "../../contexts/HandlerContext";

import { invoke, Channel } from "@tauri-apps/api/core";

export const UnitChat = () => {
  const { jamUnitHandler, configHandler } = useContext(HandlerContext);
  const { execApi } = useApi();

  // Token from the unit
  const [token, setToken] = useState<string | undefined>();
  // Are we connected to a room
  const [connected, setConnected] = useState<boolean>(false);
  // Number of players in the room
  const [playerCount, setPlayerCount] = useState<Number>(0);
  // event handler for messages from the unit
  const [_ev, setEv] = useState<Channel<string>>();
  
  async function start_me_up() {
      console.log("starting up the engine");
      const ev = new Channel<string>();
      ev.onmessage = (message: any) => {
        processJamUnitEvent(message);
      }
      setEv(ev);
      const tok: string = await invoke("start", 
        {
          // Args to start functiion in lib.rs
          onEvent: ev, 
          useAlsa: configHandler.use_alsa,
          apiUrl: configHandler.api_url,
          inDev: configHandler.in_device,
          outDev: configHandler.out_device,
        }
      );
      console.log("start gave me: " + tok);
      setToken(tok);
  }
  
  useEffect(() => {
    // on page load, start the unit
    start_me_up();
  }, []);

  useEffect(() => {
    console.log("got a token: " + token);
    jamUnitHandler.setApiFunction(sendMessage, loadUnit);
    unitInit();
    const newTimer = setInterval(() => {
      jamUnitHandler.setUpdateInterval(150);
      jamUnitHandler.setConnectionKeepAlive();
    }, 3000);
    return () => {
      clearInterval(newTimer);
      jamUnitHandler.setApiFunction(console.log, null);
    };
  }, [token]);

  async function unitInit() {
    await jamUnitHandler.getPedalTypes();
    await jamUnitHandler.refreshPedalConfig();
    await jamUnitHandler.getAudioHardwareInfo();
    await jamUnitHandler.setSocketUp(true);
  }


  useEffect(() => {
      jamUnitHandler.reloadUnitInfo();
  }, [connected, playerCount]);

  async function sendMessage(msg: any) {
    // console.log(msg);
    await invoke("send_command", { msg: msg });
    // chatRoomHandler.sendFunc(token, msg);
  }

  async function loadUnit() {
    console.log("loadUnit: " + token);
    if (!token) {
      return;
    }
    const { jamUnit } = await execApi({ token: token }, "/api/1/jamUnit", "get");
    jamUnitHandler.setJamUnitData(jamUnit);
    jamUnitHandler.setUnitName(jamUnit.name, jamUnit.token);
    jamUnitHandler.setUnitSettings(jamUnit.settings);
    if (jamUnit.players[0]) {
      jamUnitHandler.setRoomData({
        name: jamUnit.players[0].room.name,
        token: jamUnit.players[0].room.roomToken,
      });
      const { room } = await execApi({ token: jamUnit.players[0].room.roomToken }, "/api/1/rooms/players", "get");
      jamUnitHandler.setRoomInfo(room);
    } else {
      // @ts-ignore
      jamUnitHandler.setRoomData(null);
      // @ts-ignore
      jamUnitHandler.setRoomInfo(null);
    }
  }

  // This function gets called with events from the jamUnit.
  function processJamUnitEvent(contents: any) {
    try {
      if (contents.speaker !== "UnitChatRobot") {
        // We are only interested in messages from the unit
        return;
      }
      // mark the time we heard from the unit
      jamUnitHandler.lastHeardFrom = new Date();

      // This is a message with the currently loaded pedals.
      if (contents.pedalInfo) {
        const rval = contents.pedalInfo;
        if (Array.isArray(rval) && rval.length === 2 && rval[0].effects && rval[1].effects) {
          jamUnitHandler.setLoadedBoards([
            { channel: 0, boardId: rval[0].boardId, pedals: rval[0].effects },
            { channel: 1, boardId: rval[1].boardId, pedals: rval[1].effects },
          ]);
        }
      }
      // This is a message of all the pedalTypes the unit knows about
      if (contents.pedalTypes) {
        const pedalOptions = [];
        for (const key in contents.pedalTypes) {
          pedalOptions.push({ value: key, label: contents.pedalTypes[key] });
        }
        jamUnitHandler.setPedalTypes(pedalOptions);
      }
      // This is a message with the last command line output
      if (contents.cmdOutput) {
        jamUnitHandler.setCmdOutput(contents.cmdOutput);
      }
      // TODO: Not sure what this is, maybe legacy?
      if (contents.updateMsg) {
        try {
          jamUnitHandler.setUpdateMsg({
            text: contents.updateMsg.text,
            time: parseInt(contents.updateMsg.time.trim()),
          });
        } catch (error) {
          console.log("improper formatted updateMsg");
        }
      }
      // What kind of hardware does this unit have
      if (contents.audioHardware) {
        jamUnitHandler.setAudioHardware(contents.audioHardware.driver, contents.audioHardware.cards);
      }
      // Pass along a midi event (only works on old C++ systems, rust does not support midi yet)
      if (contents.midiEvent) {
        jamUnitHandler.setMidiEvent(contents.midiEvent);
      }
      // The most common event.  Levels from the unit
      if (contents.levelEvent) {
        setConnected(contents.levelEvent.connected);
        jamUnitHandler.setLevels(contents.levelEvent);
        setPlayerCount(jamUnitHandler.updatedModel.players.length);
      }
      // This is a ping from the websock thread on the rust device
      if (contents.websockPing) {
        // This is a ping from device
        jamUnitHandler.setRustIndicator();
      }
    } catch (error) {
      console.log("chat message format error");
      console.log(error);
    }
  }

  return <div className="JamUnitEventFetcher"></div>;
};
