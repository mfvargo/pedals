import { EffectSetting } from "../../../models/UnitModel";

interface Props {
  setting: EffectSetting;
  value: number;
  handleChange: (newValue: number) => void;
}
export const SettingSelectorKnob = ({ setting, value, handleChange }: Props) => {
  return (
    <div>
      <div className={`pedal__knob pedal__knob--${value}`}>
        <div className="pedal__knob-line" />
      </div>

      {setting.labels &&
        setting.labels.map((l, i) => (
          <div
            className={`pedal__knob-label pedal__effect-label pedal__effect-label--${i + setting.min}`}
            onClick={() => handleChange(i + setting.min)}
            key={`EffKnobLabel-${l}-${i}`}
          >
            {l}
          </div>
        ))}
    </div>
  );
};
