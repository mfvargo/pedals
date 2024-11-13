import { useContext, useState } from "react";

import { LevelMeter } from "../levelMeter";
import { InstrumentIcon } from "../InstrumentIcon";
import { ChannelVolume, PanControl } from "./SlideControls";
import { IconButton } from "../../common/IconButton";
import { HandlerContext } from "../../../contexts/HandlerContext";
import { Track, } from "../../../models/UnitModel";

interface Props {
  roomMute: boolean;
  chanGain: number;
  track: Track,
  // instrument: number;
  // volume: number;
  // channel: number;
  // initPan: number;
  // signal: Level;
  // inHeadphones: boolean;
  updateVolume: (channel: number, val: number) => void;
  updatePan: (channel: number, val: number) => void;
  updateMute: (channel: number, isOn: boolean) => void;
}

export const ChannelControlPanel = ({
  roomMute,
  chanGain,
  track,
  updateVolume,
  updatePan,
  updateMute,
}: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);
  // this info will come from jamUnitHandler not state
  const [isActive, _setIsActive] = useState(true);

  const { channel, icon, level, pan, mute } = track;
  const inHeadphones = !mute;

  function handleMute() {
    jamUnitHandler.roomMute(channel, !roomMute);
  }

  function handleHeadphonesClick() {
    updateMute(channel, inHeadphones);
  }

  return (
    <div className="channel-control-panel">
      <PanControl initPan={pan} inputIndex={channel} updateSlider={updatePan} />

      <div className="channel-control-panel__buttons-container">
        <IconButton
          icon={`${inHeadphones ? "headphones" : "headphonesOff"}`}
          title="Toggle sound into headphones"
          size={20}
          className={`channel-control-panel__button ${inHeadphones ? "channel-control-panel__button--in-headphones" : ""}`}
          onClick={handleHeadphonesClick}
        />
        {channel === 0 || channel === 1 ? (
          <button
            className={`channel-control-panel__button ${roomMute ? "channel-control-panel__button--muted" : ""}`}
            onClick={handleMute}
          >
            M
          </button>
        ) : (
          <span className="channel-control-panel__active-indicator-container">
            <span
              className={`channel-control-panel__active-indicator ${isActive ? "channel-control-panel__active-indicator--active" : ""}`}
            ></span>
            ACTIVE
          </span>
        )}
      </div>

      {/* {(channel === 0 || channel === 1) && <RoomMute channel={channel} mute={mute} />} */}

      <div className="channel-control-panel__levels">
        <ChannelVolume volume={chanGain} inputIndex={channel} updateSlider={updateVolume} />

        <LevelMeter signal={level} orientation="vertical" size="20rem" />
      </div>

      {/* @ts-ignore */}
      <InstrumentIcon instrument={icon} />
    </div>
  );
};
