import { PedalData } from "../../../models/UnitModel";
import { IconButton } from "../../common/IconButton";
import { PedalSetting } from "./PedalSetting";

interface Props {
  miniView: boolean;
  setMiniView: any;
  pedal: PedalData;
  deleteMe: any;
  handleSettingChange: any;
}
export const PedalBottomControls = ({ miniView, setMiniView, pedal, deleteMe, handleSettingChange }: Props) => {
  return (
    <div className="pedal__bottom-controls">
      {miniView ? (
        <IconButton icon="expand" title="Expand pedal" onClick={() => setMiniView(false)} />
      ) : (
        <IconButton icon="minimize" title="Minimize pedal" onClick={() => setMiniView(true)} />
      )}

      {pedal.settings.map(
        (setting) =>
          setting.index === 0 && (
            <span key={`${pedal.name}-${pedal.index}`}>
              <PedalSetting pedalId={pedal.index} setting={setting} handleSettingChange={handleSettingChange} />
            </span>
          ),
      )}

      <IconButton icon="trash" title="Delete pedal" onClick={deleteMe} />
    </div>
  );
};
