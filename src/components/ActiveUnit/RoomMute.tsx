import { useContext } from "react";

import { HandlerContext } from "../../contexts/HandlerContext";
import { IconButton } from "../common/IconButton";

interface Props {
  channel: 0 | 1;
  mute: boolean;
}

export const RoomMute = ({ channel, mute }: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);

  function buttonClicked() {
    jamUnitHandler.roomMute(channel, !mute);
  }

  return mute ? (
    <IconButton icon="micOff" title="Channel muted" size={20} onClick={buttonClicked} />
  ) : (
    <IconButton icon="mic" title="Mute channel" size={20} onClick={buttonClicked} />
  );
};
