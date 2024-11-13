import { PedalData } from "../../../models/UnitModel";
import { IconButton } from "../../common/IconButton";

interface Props {
  pedal: PedalData;
  moveLeft: any;
  moveRight: any;
}
export const PedalTopControls = ({ pedal, moveLeft, moveRight }: Props) => {
  return (
    <div className="pedal__top-controls">
      <IconButton icon="arrowLeft" title="Move pedal to the left" onClick={moveLeft} />

      <div className="pedal__title">{pedal.name}</div>

      <IconButton icon="arrowRight" title="Move pedal to the rightt" onClick={moveRight} />
    </div>
  );
};
