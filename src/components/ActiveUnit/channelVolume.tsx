import { useContext, useState } from "react";
// @ts-ignore
import Slider from "@appigram/react-rangeslider";

import { HandlerContext } from "../../contexts/HandlerContext";

interface ChannelVolumeProps {
  volume: number;
  inputIndex: number;
  updateSettings: any;
  channelName: string;
}
export default function ChannelVolume({ volume, inputIndex, updateSettings, channelName }: ChannelVolumeProps) {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [vol, setVol] = useState<number>(volume);

  async function setVolume(volume: number) {
    await jamUnitHandler.setVolume(inputIndex, volume);
    setVol(volume);
    updateSettings(channelName, "volume", volume);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="player-control-card__volume-slider">
        <Slider value={vol} min={-60} max={12} step={0.5} onChange={setVolume} />
      </div>
    </div>
  );
}
