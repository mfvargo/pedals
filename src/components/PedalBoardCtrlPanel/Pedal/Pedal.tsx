import { useContext, useEffect, useState } from "react";

import { PedalData } from "../../../models/UnitModel";
import { HandlerContext } from "../../../contexts/HandlerContext";
import { PedalSetting } from "./PedalSetting";
import { PedalTopControls } from "./PedalTopControls";
import { PedalBottomControls } from "./PedalBottomControls";

interface Props {
  channel: 0 | 1;
  pedal: PedalData;
}
export const Pedal = ({ channel, pedal }: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [miniView, setMiniView] = useState(true);
  const [settings, setSettings] = useState(pedal.settings);

  useEffect(() => {
    setSettings(pedal.settings);
  }, [pedal.settings]);

  const handleSettingChange = (settingName: string, newValue: number | boolean) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.name === settingName ? { ...setting, value: newValue } : setting
      )
    );
    jamUnitHandler.setEffectSetting(channel, pedal.index, settingName, newValue);
  };

  async function deleteMe() {
    await jamUnitHandler.deletePedal(channel, pedal.index);
  }

  async function moveLeft() {
    if (pedal.index > 0) {
      await jamUnitHandler.movePedal(channel, pedal.index, pedal.index - 1);
    }
  }

  async function moveRight() {
    await jamUnitHandler.movePedal(channel, pedal.index, pedal.index + 1);
  }

  // function isOn() {
  //   const bypass = pedal.settings.find((p) => p.name == "bypass");
  //   return bypass ? bypass.value : false;
  // }

  return (
    <div className={`pedal pedal--${pedal.name.split(" ").join("-")} ${miniView ? "pedal--mini" : ""}`}>
      <PedalTopControls pedal={pedal} moveLeft={moveLeft} moveRight={moveRight} />

      <div className="pedal__all-settings">
        {!miniView && (
          <div className="pedal__knobs-container">
            {settings
              .sort((a, b) => a.index - b.index)
              .map((setting) => (
                setting.index !== 0 && (
                  <span key={`pedalSetting-${channel}-${pedal.index}-${setting.index}`}>
                    <PedalSetting
                      pedalId={pedal.index}
                      setting={setting}
                      handleSettingChange={handleSettingChange}
                    />
                  </span>
                )
              ))}
          </div>
        )}

        <PedalBottomControls
          miniView={miniView}
          setMiniView={setMiniView}
          pedal={pedal}
          deleteMe={deleteMe}
          handleSettingChange={handleSettingChange}
        />
      </div>
    </div>
  );
};
