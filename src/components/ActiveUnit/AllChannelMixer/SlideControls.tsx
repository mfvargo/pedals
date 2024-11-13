import { useState } from "react";
// @ts-ignore
import Slider from "@appigram/react-rangeslider";
import ContinuousKnob from '../../PedalBoardCtrlPanel/Pedal/ContinuousKnob'

interface PanControlProps {
  initPan: number;
  inputIndex: number;
  updateSlider: (inputIndex: number, val: number) => void;
}

export const PanControl = ({ initPan, inputIndex, updateSlider }: PanControlProps) => {
  // const [pan, setPan] = useState<number>(initPan);
  const numTicks = 200;

  // convert 0-numTicks to the setting value
  function knobToValue(knobValue: number) {
    return -1 + (knobValue / numTicks) * 2;
  }

  // convert the setting to a 0-100 value
  function valueToKnob(newValue: number) {
    return (numTicks * (newValue + 1)) / 2;
  }

  function valueChanged(newKnob: number) {
    const newValue = knobToValue(newKnob);
    updateSlider(inputIndex, newValue);
    // only call handleChange if the value has changed more that step
    // if (Math.abs(pan - newValue) >= 0.05) {
    //   setPanVal(newValue);
    // }
  }

  // async function setPanVal(panVal: number) {
  //   // setPan(panVal);
  //   updateSlider(inputIndex, panVal);
  // }

  return (
    <div className="slide-control knob-container">
      <ContinuousKnob
        label={'Pan'}
        degrees={260}
        min={0}
        max={numTicks}
        value={valueToKnob(initPan)}
        onChange={valueChanged}
      />
      <div className="label top">0</div>
      <div className="label left">L</div>
      <div className="label right">R</div>
      {/* <div className="slide-control__pan-label">L</div>

      <div className="slide-control__slider slider-pan">
        <Slider value={pan} min={-1} max={1} step={0.05} onChange={setPanVal} />
      </div>

      <div className="slide-control__pan-label">R</div> */}
    </div>
  );
};

interface ChannelVolumeProps {
  volume: number;
  inputIndex: number;
  updateSlider: any;
}

export const ChannelVolume = ({ volume, inputIndex, updateSlider, }: ChannelVolumeProps) => {
  const [vol, setVol] = useState<number>(volume);

  async function setVolume(newVol: number) {
    setVol(newVol);
    updateSlider(inputIndex, newVol);
  }

  return (
    <div className="slide-control">
      <Slider value={vol} min={-60} max={12} step={0.5} orientation="vertical" onChange={setVolume} />
    </div>
  );
};
