// @ts-ignore
import Slider from "@appigram/react-rangeslider";

interface Props {
  volume: number;
  channel: number;
  caption: string;
  controlChange: any;
}
export default function Volume({ volume, channel, caption, controlChange }: Props) {
  async function setVolume(newVol: number) {
    await controlChange(channel, newVol);
  }

  return (
    <div className="volume-slider">
      <div className="slider">
        <Slider value={volume} orientation="vertical" min={-60} max={12} step={0.5} onChange={setVolume} />
      </div>
      <div className="level">{volume}</div>
      <div className="caption">{caption}</div>
      {/* <div className="mutebutton">
        <input type="checkbox" id={"mute_" + channel} name="vehicle1" value="On" onChange={muteButton} />
      </div> */}
    </div>
  );
}
