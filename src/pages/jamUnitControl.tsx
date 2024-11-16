import { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { UnitChat } from "../components/chatControl/unitChat";
import { AllChannelMixer } from "../components/ActiveUnit/AllChannelMixer/AllChannelMixer";
import JamUnitConfig from "../components/JamUnitConfig";
import { PedalBoardCtrlPanel } from "../components/PedalBoardCtrlPanel/PedalBoardCtrlPanel";
import { RoomSelect } from "../components/RoomSelector/RoomSelect";
import { UnitModel } from "../models/UnitModel";
import { HandlerContext } from "../contexts/HandlerContext";

const JamUnitControl = () => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    jamUnitHandler.subscribe("unit", "jamUnitControl", distributeInfo);
    return () => {
      jamUnitHandler.unsubscribe("unit", "jamUnitControl");
    };
  }, []);

  async function distributeInfo(unit: UnitModel) {
    setToken(unit.token);
  }

  return (
    <div className="JamUnitControl">
    <div className="JamUnitControl" key="JamUnitControl">
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
      <UnitChat/>
    </div>
  );
};

export default JamUnitControl;
