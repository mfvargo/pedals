import { useContext, useEffect, useState } from "react";

import { HandlerContext } from "../../contexts/HandlerContext";
import { useApi } from "../../hooks/useApi";
import {
  UnitModel,
  MidiEvent,
  PedalOption,
  MidiMessageType,
  BoardData,
} from "../../models/UnitModel";
import { BoardListDisplay } from "./BoardListDisplay/BoardListDisplay";
import PedalBoard from "./PedalBoard/PedalBoard";

interface Props {
  channel: 0 | 1;
}

export const ChannelEffect = ({ channel }: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const { execApi } = useApi(); // Talk to the cloud

  const [boardName, setBoardName] = useState<string>("New Board");
  const [program, setProgram] = useState<number>(1);  // Give it a default
  const [pedalOptions, setPedalOptions] = useState<Array<PedalOption>>(
    jamUnitHandler.updatedModel.boardInfo.pedalOptions
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  // Midi events from a mide device connected to the raspberry pi
  const [midiEvent, setMidiEvent] = useState<MidiEvent>();

  // This is the board that is loaded in the unit
  const [board, setBoard] = useState<BoardData>(
    jamUnitHandler.updatedModel.boardInfo.loadedBoards[channel]
  );
 
  useEffect(() => {
    // jamUnitHandler.deviceCommand("systemctl restart rtjam-midi");
    jamUnitHandler.subscribe("boards", `ChannelEffect-${channel}`, distributeInfo);
    jamUnitHandler.subscribe("midi", `ChannelEffect-${channel}`, distributeMidi);
    return () => {
      jamUnitHandler.unsubscribe("boards", `ChannelEffect-${channel}`);
      jamUnitHandler.unsubscribe("midi", `ChannelEffect-${channel}`);
    };
  }, []);

  function distributeInfo(model: UnitModel) {
    setBoard(model.boardInfo.loadedBoards[channel]);
    setPedalOptions(model.boardInfo.pedalOptions);
  }

  function distributeMidi(model: UnitModel) {
    setMidiEvent(model.midiEvent);
  }

  useEffect(() => {
    if (midiEvent) {
      // Clear the event so we don't keep getting it
      // jamUnitHandler.setMidiEvent(undefined);
      gotMidi(midiEvent);
    }
  }, [midiEvent]);

  async function gotMidi(midiEvent: MidiEvent) {
    console.log(midiEvent);
    if (midiEvent.type === MidiMessageType.programChange) {
      // find first board (if any) with that program number
      const result = await execApi(
        {
          ...{
            program: midiEvent.note + 1, // Add one to make 1 based
          },
        },
        "/api/1/pedalBoards",
        "put"
      );
      if (result.count === 1) {
        loadBoard(result.data[0].id);
      } else {
        loadBoard(-1);
      }
    }
    if (midiEvent.type === MidiMessageType.controlChange) {
      switch (midiEvent.note) {
        case 80:
          break;
        case 81:
          break;
        case 82:
          jamUnitHandler.tunerOn(channel, midiEvent.velocity === 127);
          break;
        case 83:
          // switch 4 should clear the board
          loadBoard(-1);
          break;
      }
      // Expression pedal.  What to do with this?
      // TODO: figure out how to take the note, velocity pair and
      // do something sensible with that.
    }
  }

  // This will fetch a board from the cloud (or erase the board)
  async function loadBoard(boardId: number) {
    // Let's get the board
    if (boardId < 0) {
      // we want to clear the existing pedalboard
      await jamUnitHandler.loadBoardFromConfig(channel, { id: boardId, config: [] });
    } else {
      // Fetch the board from the api
      const { pedalBoard } = await execApi(undefined, "/api/1/pedalBoards/" + boardId, "get");
      setBoardName(pedalBoard.name);
      setProgram(pedalBoard.program);
      jamUnitHandler.loadBoardFromConfig(channel, pedalBoard);
    }
    setEditMode(false);
  }

  async function savePedalsForLater(bCreate: boolean, opts: any) {
      if (board.boardId == -1 || bCreate) {
        const result = await execApi(
          {
            ...opts,
            ...{ config: board.pedals },
          },
          "/api/1/pedalBoards",
          "post",
        );
        jamUnitHandler.loadBoardFromConfig(channel, result.pedalBoard);
      } else {
        // This is an update
        await execApi(
          {
            ...opts,
            ...{ config: board.pedals },
          },
          "/api/1/pedalBoards/" + board.boardId,
          "put",
        );
      }
  }

  return (
    <div>
      <BoardListDisplay channel={channel} loadBoard={loadBoard} setEditMode={setEditMode} />

      <PedalBoard
        channel={channel}
        pedals={board.pedals}
        pedalOptions={pedalOptions}
        boardId={board.boardId}
        program={program}
        boardName={boardName}
        editMode={editMode}
        setEditMode={setEditMode}
        setBoardName={setBoardName}
        saveFunc={savePedalsForLater}
        loadBoard={loadBoard}
      />
    </div>
  );
};
