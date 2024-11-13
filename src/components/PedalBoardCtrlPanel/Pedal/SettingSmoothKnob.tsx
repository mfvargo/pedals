import { EffectSetting } from "../../../models/UnitModel";
import ContinuousKnob from "./ContinuousKnob";

interface Props {
  setting: EffectSetting;
  value: number;
  handleChange: (newValue: number) => void;
  pedalId: number;
}
export const SettingSmoothKnob = ({ setting, value, handleChange, pedalId }: Props) => {
  const numTicks = 200;

  // convert 0-numTicks to the setting value
  function knobToValue(knobValue: number) {
    return setting.min + (knobValue / numTicks) * (setting.max - setting.min);
  }

  // convert the setting to a 0-100 value
  function valueToKnob(newValue: number) {
    return (numTicks * (newValue - setting.min)) / (setting.max - setting.min);
  }

  function valueChanged(newKnob: number) {
    const newValue = knobToValue(newKnob);
    // only call handleChange if the value has changed more that step
    if (Math.abs(value - newValue) >= setting.step) {
      handleChange(newValue);
    }
  }

  return (
    <div className="pedal__continuous-knob-container">
      <div className="pedal__knob-label">{setting.name}</div>

      <ContinuousKnob
        label={setting.name}
        degrees={260}
        min={0}
        max={numTicks}
        value={valueToKnob(value)}
        onChange={valueChanged}
        pedalId={pedalId}
      />

      <div className="pedal__continuous-knob-value">{value.toFixed(2)}</div>
    </div>
  );
};
