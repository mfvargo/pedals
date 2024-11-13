import { useState } from "react";

import { EffectSetting } from "../../../models/UnitModel";
import { SettingFootswitch } from "./SettingFootSwitch";
import { SettingSmoothKnob } from "./SettingSmoothKnob";
import { SettingSelectorKnob } from "./SettingSelectorKnob";

interface Props {
  pedalId: number;
  setting: EffectSetting;
  handleSettingChange: (name: string, newValue: number | boolean) => void;
}
export const PedalSetting = ({ pedalId, setting, handleSettingChange }: Props) => {
  const [value, setValue] = useState(setting.value);

  const handleChange = (newValue: number | boolean) => {
    setValue(newValue);
    // notify parent of the change
    handleSettingChange(setting.name, newValue);
  };

  const slider = (typeof value === 'number') && (
    <SettingSmoothKnob setting={setting} value={value} handleChange={handleChange} pedalId={pedalId} />
  )

  const selector = (typeof value === 'number') && (
    <SettingSelectorKnob setting={setting} value={value} handleChange={handleChange} />
  )

  const footswitch = (typeof value === 'boolean') && (
    <SettingFootswitch value={value} handleChange={handleChange} />
  )

  return (
    <>
      {setting.type === 0 && slider}
      {setting.type === 1 && selector}
      {setting.type === 2 && footswitch}
    </>
  );
};
