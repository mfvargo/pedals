import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

interface Props {
  activeChannel: number;
  makeActive: (number: number) => void;
}

export const ChannelSelector = ({ activeChannel, makeActive }: Props) => {
  const chanOptions = ["Channel 1", "Channel 2"];

  return (
    <div className="player-buttons">
      <ButtonGroup className="player-buttons__button-group">
        {chanOptions.map((label, chan) => {
          return (
            <span key={`boardSelectorRadio-${chan}`}>
              <ToggleButton
                id={`boardSelectorRadio-${chan}`}
                type="radio"
                name="radio"
                value={chan}
                className={`player-buttons__button player-buttons__button--${
                  activeChannel === chan ? "active" : "inactive"
                }`}
                onChange={() => makeActive(chan)}
              >
                {label}
              </ToggleButton>
            </span>
          );
        })}
      </ButtonGroup>
    </div>
  );
};
