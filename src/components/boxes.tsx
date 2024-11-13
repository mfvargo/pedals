import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

import { JamUnit as BoxUnitModel } from "../nation";
import { BroadcastUnit as BroadcastUnitModel } from "../nation";
import { RoomShow } from "../nation";
import { useApi } from "../hooks/useApi";
import { instrumentIconOptions } from "./ActiveUnit/InstrumentIcon";
import { Button } from "./common/Button";
import { IconButton } from "./common/IconButton";

type BoxUnitData = Awaited<ReturnType<typeof BoxUnitModel.prototype.apiData>>;
type BroadcastUnitData = Awaited<ReturnType<typeof BroadcastUnitModel.prototype.apiData>>;
type RoomModelData = Awaited<ReturnType<typeof RoomShow.prototype.runWithinTransaction>>;

const editContent = (handleSubmit: any, onSubmit: any, unit: any, register: any) => {
  console.log(unit);
  return (
    <div className="box-unit-card">
      <Form id={unit.token} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="box-unit-card__name-input">
          <Form.Label className="box-unit-card__info" htmlFor="unitName">
            Name
          </Form.Label>
          <Form.Control id="unitName" autoFocus defaultValue={unit.name} required type="text" {...register("name")} />

          <Form.Label className="box-unit-card__info" htmlFor="unitChanOneIcon">
            Chan One Icon
          </Form.Label>

          <Form.Control
            id="unitChanOneIcon"
            autoFocus
            defaultValue={unit.chanOneIcon}
            as="select"
            {...register("chanOneIcon")}
          >
            {instrumentIconOptions.map((v, idx) => (
              <option key={`${v[0]}-icon-1`} value={idx}>
                {v[0]}
              </option>
            ))}
          </Form.Control>

          <Form.Label className="box-unit-card__info" htmlFor="unitChanTwoIcon">
            Chan Two Icon
          </Form.Label>
          <Form.Control
            id="unitChanTwoIcon"
            autoFocus
            defaultValue={unit.chanTwoIcon}
            as="select"
            {...register("chanTwoIcon")}
          >
            {instrumentIconOptions.map((v, idx) => (
              <option key={`${v[0]}-icon-2`} value={idx}>
                {v[0]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="box-unit-card__save-button" btnText="Save" title="Save Jam Unit" type="submit" />
      </Form>
    </div>
  );
};

const broadcastEditContent = (handleSubmit: any, onSubmit: any, unit: any, register: any) => {
  console.log(unit);
  return (
    <div className="box-unit-card">
      <Form id={unit.token} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="box-unit-card__name-input">
          <Form.Label className="box-unit-card__info" htmlFor="unitName">
            Name
          </Form.Label>
          <Form.Control id="unitName" autoFocus defaultValue={unit.name} required type="text" {...register("name")} />

          <Form.Label className="box-unit-card__info" htmlFor="unitChanOneIcon">
            Chan One Icon
          </Form.Label>
        </Form.Group>
        <Button className="box-unit-card__save-button" btnText="Save" title="Save Jam Unit" type="submit" />
      </Form>
    </div>
  );
};

const viewContent = (onEdit: any, unit: any, releaseFunction: any) => {
  const { upSince, lastSeenAt, name, gitHash, macAddress, canTalkOnWebsocket } = unit;
  const hours = Math.floor(lastSeenAt / 60 / 60);
  const minutes = Math.floor(lastSeenAt / 60) - hours * 60;
  const seconds = Math.round(lastSeenAt % 60);

  return (
    <div className="box-unit-card">
      <div>
        <div style={{ display: "flex" }}>
          Name: <span className="box-unit-card__info">{name}</span>
          <IconButton icon="edit" size={18} title="Edit name" onClick={onEdit} />
        </div>
        <div>
          GitHash: <span className="box-unit-card__info">{gitHash}</span>
        </div>
        <div>
          Mac Address: <span className="box-unit-card__info">{macAddress}</span>
        </div>
        <div>
          Up Since: <span className="box-unit-card__info">{upSince}</span>
        </div>
        <div>
          Last Heard From:{" "}
          <span className="box-unit-card__info">
            {hours > 0 && `${hours}hrs `}
            {minutes > 0 && `${minutes}mins `}
            {seconds}seconds ago
          </span>
        </div>

        <div className="unitStatus">
          {lastSeenAt < 20 && (
            <div>
              {canTalkOnWebsocket && (
                <button>
                  <a href={`/jamUnitControl?token=${unit.token}`}>Click Here to use device</a>
                </button>
              )}
            </div>
          )}
          {lastSeenAt > 20 && <strong>Unit is not currently active.</strong>}
        </div>
      </div>

      <IconButton
        icon="trash"
        title="Release Unit"
        className="box-unit-card__button"
        id={macAddress}
        onClick={releaseFunction}
      />
    </div>
  );
};

// Component to manage a BroadCast Unit
export const BroadcastBox = ({ iUnit, releaseFunction }: any) => {
  const { execApi } = useApi();
  const { handleSubmit, register } = useForm();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [unit, setUnit] = useState<BroadcastUnitData>(iUnit);

  const onEdit = async () => {
    setEditMode(true);
  };

  const onSubmit = async ({ name }: any) => {
    await execApi({ token: unit.token, name: name }, "/api/1/broadcastUnit", "put", setUnit, "broadcastUnit");
    setEditMode(false);
    // @ts-ignore
    // document.getElementById("messageForm").reset();
  };

  return (
    <div key={iUnit} className={"UnitBox"}>
      {editMode
        ? broadcastEditContent(handleSubmit, onSubmit, unit, register)
        : viewContent(onEdit, unit, releaseFunction)}
    </div>
  );
};

// Component to manage a JamUnit
export const JamUnitBox = ({ iUnit, releaseFunction }: any) => {
  const { execApi } = useApi();
  const { handleSubmit, register } = useForm();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [unit, setUnit] = useState<BoxUnitData>(iUnit);

  const onSubmit = async ({ name, chanOneIcon, chanTwoIcon }: any) => {
    await execApi(
      { token: unit.token, name: name, chanOneIcon: chanOneIcon, chanTwoIcon: chanTwoIcon },
      "/api/1/jamUnit",
      "put",
    );
    execApi({ token: unit.token }, "/api/1/jamUnit", "get", setUnit, "jamUnit");
    setEditMode(false);
    // @ts-ignore
    // document.getElementById("messageForm").reset();
  };

  const onEdit = async () => {
    setEditMode(true);
  };

  if (!unit) {
    return <>Loading...</>;
  }
  return (
    <div className={"JamUnitBox UnitBox"} key={iUnit}>
      {editMode ? editContent(handleSubmit, onSubmit, unit, register) : viewContent(onEdit, unit, releaseFunction)}
    </div>
  );
};

// Component to view who is in a room
export const RoomBox = ({ token, onJoin, connectStatus }: any) => {
  const { execApi } = useApi();
  const [unit, setUnit] = useState<RoomModelData["room"]>();
  useEffect(() => {
    execApi({ token: token }, "/api/1/rooms/players", "get", setUnit, "room");
  }, [connectStatus]);

  if (!unit) {
    return <>Loading...</>;
  }

  return (
    <div className="RoomBox" key={token}>
      <div className="title">
        <button onClick={onJoin} id={unit.token}>
          Join
        </button>
        {unit.name} (port: {unit.port})
      </div>

      {/* <div className="lastSeen">Last seen {unit.lastSeenAt} seconds ago.</div>
      <div className="players">
        <ul>
          {unit.players.map((p) => (
            <li>{p.name}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};
