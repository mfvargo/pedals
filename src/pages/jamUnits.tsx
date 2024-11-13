import { useEffect, useState } from "react";

import { useApi } from "../hooks/useApi";
import { JamUnitBox, BroadcastBox } from "../components/boxes";
import { IconButton } from "../components/common/IconButton";
import { BroadcastUnitIndex, JamUnitIndex } from "../nation";

type JamUnitIndexResponse = Awaited<ReturnType<typeof JamUnitIndex.prototype.runWithinTransaction>>;
type BroadcastUnitIndexResponse = Awaited<ReturnType<typeof BroadcastUnitIndex.prototype.runWithinTransaction>>;

interface HomelessUnitProps {
  unit: any;
  handleClick: any;
  unitType: string;
}

const HomelessUnit = ({ unit, handleClick, unitType }: HomelessUnitProps) => {
  const { name, lanIp, macAddress } = unit;
  return (
    <div className={"UnitBox box-unit-card"} key={`homeless${unitType}Unit${macAddress}`}>
      <div className="box-unit-card__info">
        {name} {lanIp} - {macAddress}
      </div>

      <IconButton
        icon="add"
        title="Acquire Unit"
        className="box-unit-card__button"
        id={macAddress}
        onClick={handleClick}
      />
    </div>
  );
};

export default function JamUnits() {
  const { execApi } = useApi();
  const [myJamUnits, setMyJamUnits] = useState<JamUnitIndexResponse["data"]>([]);
  const [jamUnits, setJamUnits] = useState<JamUnitIndexResponse["data"]>([]);
  const [myBroadcastUnits, setMyBroadcastUnits] = useState<BroadcastUnitIndexResponse["data"]>([]);
  const [broadcastUnits, setBroadcastUnits] = useState<BroadcastUnitIndexResponse["data"]>([]);
  
  useEffect(() => {
    loadUnits();
  }, []);

  async function loadUnits() {
    await execApi({ scan: true }, "/api/1/jamUnits", "get", setJamUnits, "data");
    await execApi(undefined, "/api/1/jamUnits", "get", setMyJamUnits, "data");
    await execApi({ scan: true }, "/api/1/broadcastUnits", "get", setBroadcastUnits, "data");
    await execApi(undefined, "/api/1/broadcastUnits", "get", setMyBroadcastUnits, "data");
  }

  async function acquireUnit({ target }: any) {
    await execApi({ macAddress: target.id }, "/api/1/jamUnit/acquire", "put");
    await loadUnits();
  }
  async function acquireBroadcastUnit({ target }: any) {
    await execApi({ macAddress: target.id }, "/api/1/broadcastUnit/acquire", "put");
    await loadUnits();
  }
  async function releaseUnit({ target }: any) {
    await execApi({ macAddress: target.id }, "/api/1/jamUnit/release", "put");
    await loadUnits();
  }
  async function releaseBroadcastUnit({ target } :any) {
    await execApi({ macAddress: target.id }, "/api/1/broadcastUnit/release", "put");
    await loadUnits();
  }

  return (
    <>
      <h3>JamUnits</h3>
      {myJamUnits.map((unit) => (
        <JamUnitBox iUnit={unit} releaseFunction={releaseUnit} key={unit.token} />
      ))}
      <hr />
      <br />
      <h3>Broadcast Units</h3>
      {myBroadcastUnits.map((unit) => (
        <BroadcastBox iUnit={unit} releaseFunction={releaseBroadcastUnit} key={unit.token} />
      ))}
      {jamUnits.length > 0 && (
        <>
          <hr />
          <br />
          <h3>Homeless Jam Units</h3>
          {jamUnits.map((unit) => (
            <HomelessUnit unit={unit} handleClick={acquireUnit} unitType={"Jam"} />
          ))}
        </>
      )}
      {broadcastUnits.length > 0 && (
        <>
          <hr />
          <br />
          <h3>Homeless Broadcast Units</h3>
          {broadcastUnits.map((unit) => (
            <HomelessUnit unit={unit} handleClick={acquireBroadcastUnit} unitType={"Broadcast"} />
          ))}
        </>
      )}
    </>
  );
}
