import { useContext, useState } from "react";
// @ts-ignore
import Slider from "@appigram/react-rangeslider";

import { HandlerContext } from "../../contexts/HandlerContext";

interface PanControlProps {
  initPan: number;
  inputIndex: number;
  updateSettings: any;
  channelName: string;
}
export default function PanControl({ initPan, inputIndex, updateSettings, channelName }: PanControlProps) {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [pan, setPan] = useState<number>(initPan);

  async function setPanVal(panVal: number) {
    await jamUnitHandler.setFader(inputIndex, panVal);
    setPan(panVal);
    updateSettings(channelName, "fade", panVal);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="player-control-card__volume-slider">
        <Slider value={pan} min={-1} max={1} step={0.05} onChange={setPanVal} />
      </div>
    </div>
  );
}
