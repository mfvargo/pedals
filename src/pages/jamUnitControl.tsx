import { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LevelMeter } from "../components/ActiveUnit/levelMeter";
import { RoomMute } from "../components/ActiveUnit/RoomMute";

import { UnitChat } from "../components/chatControl/unitChat";
import { AllChannelMixer } from "../components/ActiveUnit/AllChannelMixer/AllChannelMixer";
import JamUnitConfig from "../components/JamUnitConfig";
import { PedalBoardCtrlPanel } from "../components/PedalBoardCtrlPanel/PedalBoardCtrlPanel";
import { RoomSelect } from "../components/RoomSelector/RoomSelect";
import { Level, UnitModel } from "../models/UnitModel";
import { HandlerContext } from "../contexts/HandlerContext";
import { WebsockStream } from "../components/chatControl/WebSockStream";

const JamUnitControl = () => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [token, setToken] = useState<string>("");
  const [roomLeft, setRoomLeft] = useState<Level>({ level: -60.0, peak: -60.0 });
  const [roomRight, setRoomRight] = useState<Level>({ level: -60.0, peak: -60.0 });
  const [leftMute, setLeftMute] = useState<boolean>(false);
  const [rightMute, setRightMute] = useState<boolean>(false);

  useEffect(() => {
    jamUnitHandler.subscribe("unit", "jamUnitControl", distributeInfo);
    jamUnitHandler.subscribe("levels", "jamUnitControl", updateLevels);
    return () => {
      jamUnitHandler.unsubscribe("unit", "jamUnitControl");
      jamUnitHandler.unsubscribe("levels", "jamUnitControl");
    };
  }, []);

  async function distributeInfo(unit: UnitModel) {
    setToken(unit.token);
  }

  async function updateLevels(unit: UnitModel) {
    // console.log(unit);
    setRoomLeft(unit.roomLeft);
    setRoomRight(unit.roomRight);
    setLeftMute(unit.leftRoomMute);
    setRightMute(unit.rightRoomMute);
  }

  return (
    <div className="JamUnitControl">
    <div className="JamUnitControl" key="JamUnitControl">
        <div className="topLevel">
          <div className="d-flex align-items-center mb-2">
            <RoomMute channel={0} mute={leftMute} />
            <LevelMeter signal={roomLeft} size={150} />
          </div>
          <div className="d-flex align-items-center mb-2">
            <RoomMute channel={1} mute={rightMute} />
            <LevelMeter signal={roomRight} size={150} />
          </div>
        </div>

        {/* @ts-ignore */}
        <Tabs fill defaultActiveKey="rooms" className="mb-3">
          <Tab eventKey="rooms" title="Rooms">
            <RoomSelect token={token} />
          </Tab>

          <Tab eventKey="mixer-control" title="Mixer Control">
            <AllChannelMixer />
          </Tab>

          <Tab eventKey="pedalboards" title="Pedalboards">
            <PedalBoardCtrlPanel />
          </Tab>
          <Tab eventKey="unitConfig" title="Settings">
            <JamUnitConfig token={token} />
          </Tab>
        </Tabs>
      </div>
      <WebsockStream />
      <UnitChat/>
    </div>
  );
};

export default JamUnitControl;
