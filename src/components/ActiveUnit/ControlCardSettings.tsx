import ChannelVolume from "./channelVolume";

interface CtrlCardSettingProps {
  inputIndex: number;
  checked: boolean;
  handleChecked: any;
  updateSettings: any;
  channelName: string;
  volume: number;
}

const ControlCardSettings = ({
  inputIndex,
  checked,
  handleChecked,
  updateSettings,
  channelName,
  volume,
}: CtrlCardSettingProps) => {
  return (
    <>
      <ChannelVolume
        volume={volume}
        inputIndex={inputIndex}
        updateSettings={updateSettings}
        channelName={channelName}
      />

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="showPeakCheckbox"
          checked={checked}
          onChange={handleChecked}
        />

        <label className="form-check-label" htmlFor="showPeakCheckbox">
          Show Peak
        </label>
      </div>
    </>
  );
};

export default ControlCardSettings;
