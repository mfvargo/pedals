import { useContext, useEffect, useState } from "react";
import Select from "react-select";

import { PedalData, PedalOption, UnitModel } from "../../../models/UnitModel";
import { HandlerContext } from "../../../contexts/HandlerContext";
import { Tuner } from "../../ActiveUnit/Tuner";
import { Pedal } from "../Pedal/Pedal";
import { PedalBoardSave } from "./PedalBoardSave";

interface Props {
  channel: 0 | 1;
  pedals: PedalData[];
  pedalOptions: PedalOption[];
  boardId: number;
  boardName: string;
  program: number;
  editMode: boolean;
  saveFunc(bCreate: any, opts: any): Promise<void>;
  loadBoard(boardId: number): Promise<void>;
  setBoardName: (oardName: string) => void;
  setEditMode: (editMode: boolean) => void;
}

export default function PedalBoard({
  channel,
  pedals,
  pedalOptions,
  boardId,
  program,
  boardName,
  editMode,
  saveFunc,
  loadBoard,
  setBoardName,
  setEditMode,
}: Props) {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [frequency, setFrequency] = useState<number>(0);
  const [tunerOn, setTunerOn] = useState<boolean>(false);

  async function addPedal(selectedOption: any) {
    await jamUnitHandler.insertPedal(channel, 99, selectedOption.value);
    if (!boardName) {
      setBoardName("New Board");
      setEditMode(true);
    }
  }

  useEffect(() => {
    jamUnitHandler.subscribe("levels", `pedalboard-${channel}`, distributeUnitInfo);
    return () => {
      jamUnitHandler.unsubscribe("levels", `pedalboard-${channel}`);
    };
  }, []);

  function distributeUnitInfo(model: UnitModel) {
    if (channel === 0) {
      setFrequency(model.inputLeftFreq);
      setTunerOn(model.leftTunerOn);
    }
    if (channel == 1) {
      setFrequency(model.inputRightFreq);
      setTunerOn(model.rightTunerOn);
    }
  }

  function toggleMinimize() {
    jamUnitHandler.tunerOn(channel, !tunerOn);
  }

  return (
    <div className="pedalboard-container">
      <PedalBoardSave
        boardId={boardId}
        program={program}
        boardName={boardName}
        saveFunc={saveFunc}
        editMode={editMode}
        loadBoard={loadBoard}
        setBoardName={setBoardName}
        setEditMode={setEditMode}
        toggleMinimize={toggleMinimize}
      />

      <div className="d-flex justify-content-center">
        <div className="pedalboard">
          <Tuner frequency={frequency} isOn={tunerOn} channel={channel} />

          {pedals.map((pedal, idx) => (
            <Pedal
              channel={channel}
              pedal={pedal}
              key={`pedal-${channel}-${idx}-${pedal.name}`}
            />
          ))}
        </div>
      </div>

      {pedals.length < 10 && (
        <div className="pedalboard-add-pedal-dropdown">
          <Select placeholder="Select a pedal..." value={null} onChange={addPedal} options={pedalOptions} />
        </div>
      )}
    </div>
  );
}
