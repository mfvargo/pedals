import { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { AllChannelMixer } from "../components/ActiveUnit/AllChannelMixer/AllChannelMixer";
import JamUnitConfig from "../components/JamUnitConfig";
import { PedalBoardCtrlPanel } from "../components/PedalBoardCtrlPanel/PedalBoardCtrlPanel";
import { UnitModel } from "../models/UnitModel";
import { HandlerContext } from "../contexts/HandlerContext";

const JamUnitControl = () => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    jamUnitHandler.subscribe("unit", "jamUnitControl", distributeInfo);
    jamUnitHandler.reloadUnitInfo();
    return () => {
      jamUnitHandler.unsubscribe("unit", "jamUnitControl");
    };
  }, []);

  async function distributeInfo(unit: UnitModel) {
    setToken(unit.token);
  }

  const loaded = (
    <div className="JamUnitControl" key="JamUnitControl">
      {/* @ts-ignore */}
      <Tabs fill defaultActiveKey="mixer-control">
        <Tab eventKey="mixer-control" title="Mixer Control">
          <AllChannelMixer token={token} />
        </Tab>

        <Tab eventKey="pedalboards" title="Pedalboards">
          <PedalBoardCtrlPanel />
        </Tab>
        <Tab eventKey="unitConfig" title="Settings">
          <JamUnitConfig token={token} />
        </Tab>
      </Tabs>
    </div>
  );

  return (
    <div className="JamUnitControl">
      { token ? loaded : "loading"}
    </div>
  );
};

export default JamUnitControl;
