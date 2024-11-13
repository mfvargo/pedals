import { useContext, useState } from "react";
// @ts-ignore
import Slider from "@appigram/react-rangeslider";

import { HandlerContext } from "../../contexts/HandlerContext";

interface Props {
  beat: number;
}

export const Metronome = ({ beat }: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [volume, setVolume] = useState<number>(0);

  async function updateVolume(newVol: number) {
    jamUnitHandler.setMetronomeConfig(0, newVol);
    setVolume(newVol);
  }

  return (
    <div className="Metronome">
      <div className="title">Metronome</div>
      <div className={"beat" + (beat == 1 ? " downBeat" : "")}>1</div>
      <div className={"beat" + (beat == 2 ? " onBeat" : "")}>2</div>
      <div className={"beat" + (beat == 3 ? " onBeat" : "")}>3</div>
      <div className={"beat" + (beat == 4 ? " onBeat" : "")}>4</div>
      <div className="volume-slider">
        <div className="slider">
          <Slider value={volume} orientation="vertical" min={0} max={3.0} step={0.05} onChange={updateVolume} />
        </div>
        <div className="level">Vol</div>
      </div>
    </div>
  );
};
