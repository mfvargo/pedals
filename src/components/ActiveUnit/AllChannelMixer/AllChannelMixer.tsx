import { useContext, useEffect, useState } from "react";

import { Player, UnitModel } from "../../../models/UnitModel";
import { HandlerContext } from "../../../contexts/HandlerContext";
import { MixerControlPanel } from "./MixerControlPanel";
import { InputControl } from "../LocalUnitControl/InputControl";

// The All Channel mixer just needs the jamUnitHandler to get data and the execApi so
// it can call server functions to get/save player settings.
export const AllChannelMixer = () => {
  const { jamUnitHandler } = useContext(HandlerContext);

  // List of players in the room from the jamUnitHandler
  const [players, setPlayers] = useState<Array<Player>>([]);
  // This is the index of the player that is in the control
  const [roomLeftMute, setRoomLeftMute] = useState<boolean>(false);
  const [roomRightMute, setRoomRightMute] = useState<boolean>(false);

  useEffect(() => {
    jamUnitHandler.subscribe("levels", "AllChannelMixer", distributePlayerInfo);
    return () => {
      jamUnitHandler.unsubscribe("levels", "AllChannelMixer");
    };
  }, []);

  function distributePlayerInfo(model: UnitModel) {
    setPlayers(model.players);
    setRoomLeftMute(model.leftRoomMute);
    setRoomRightMute(model.rightRoomMute);
  }

  const loading = <div>Waiting for unit audio to start...</div>;

  const loaded = (
    <div className="all-channel-mixer">
      {players.filter((p) => p.token).map((player) => (
        <MixerControlPanel
          key={player.clientId}
          player={player}
          roomLeftMute={roomLeftMute}
          roomRightMute={roomRightMute}
        />
      ))}

      <InputControl />
    </div>
  );

  return players.length > 0 ? loaded : loading;
};
