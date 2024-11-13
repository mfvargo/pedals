interface SettingFootswitchProps {
  value: boolean;
  handleChange: (newValue: number | boolean) => void;
}

export const SettingFootswitch = ({ value, handleChange }: SettingFootswitchProps) => {

  return (
    <div className="pedal__bypass-container">
      <div className="pedal__bypass-button-container">
        <button className="pedal__bypass-button" onClick={() => handleChange(!value)}></button>
      </div>

      <div className={`pedal__bypass-light pedal__bypass-light--${value ? "clicked" : "unclicked"}`} />
    </div>
  );
};
