import { useEffect, useState, useContext } from "react";
import { UnitModel } from "../../models/UnitModel";
import { RTJamParameters } from "../../utils/jamUnitHandler";
import { useApi } from "../../hooks/useApi";
import { HandlerContext } from "../../contexts/HandlerContext";

export default function TestAPI() {
  const { jamUnitHandler } = useContext(HandlerContext);
  const { execApi } = useApi();

  const [unitModel, setUnitModel] = useState<UnitModel>();
  const [jsonTime, setJsonTime] = useState<number>(0);

  useEffect(() => {
    jamUnitHandler.subscribe("levels", "TestAPI", distributeInfo);
    return () => {
      jamUnitHandler.unsubscribe("levels", "TestAPI");
    };
  }, []);

  function distributeInfo(model: UnitModel) {
    // console.log(model);
    setUnitModel(model);
    setJsonTime(model.jsonTimeStamp);
  }

  function setVolume() {
    jamUnitHandler.setVolume(RTJamParameters.paramMasterVol, -10);
  }

  function refreshPedalConfig() {
    jamUnitHandler.refreshPedalConfig();
  }

  function getPedalTypes() {
    jamUnitHandler.getPedalTypes();
  }

  function checkUpdate() {
    jamUnitHandler.updateCheck();
  }

  function deviceCommand() {
    jamUnitHandler.deviceCommand("ls -l");
  }

  function getAudioHardware() {
    jamUnitHandler.getAudioHardwareInfo();
  }

  function dumpModel() {
    jamUnitHandler.dumpModelToConsole();
  }

  async function disconnect() {
    // @ts-ignore
    await execApi({ jamUnitToken: unitModel.token }, "/api/1/players", "delete");
    jamUnitHandler.disconnect();
  }

  function activePage() {
    if (!unitModel) return <div>"loading"</div>;
    return (
      <div className="TestAPI DeviceConfig">
        <p>Json time: {jsonTime}</p>
        <ul>
          <li>
            <button onClick={setVolume}>setVolume</button>
          </li>
          <li>
            <button onClick={refreshPedalConfig}>refreshPedalConfig</button>
          </li>
          <li>
            <button onClick={getPedalTypes}>getPedalTypes</button>
          </li>
          <li>
            <button onClick={checkUpdate}>checkUpdate</button>
          </li>
          <li>
            <button onClick={deviceCommand}>deviceCommand (ls -l)</button>
          </li>
          <li>
            <button onClick={getAudioHardware}>getAudioHardware</button>
          </li>
          <li>
            <button onClick={dumpModel}>dumpModel</button>
          </li>
          <li>
            <button onClick={disconnect}>disconnect</button>
          </li>
        </ul>
        <p>cmdOutput:</p>
        <div className="commandOutput">
          {unitModel.cmdOutput &&
            unitModel.cmdOutput.split("\n").map((line) => (
              <>
                {line} <br />
              </>
            ))}
        </div>
      </div>
    );
  }

  return activePage();
}
