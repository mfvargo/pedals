import DepthIcon from "../DepthIcon";
import { Player } from "../../../models/UnitModel";

interface Props {
  player: Player;
}

export const MixerControlHeader = ({ player}: Props ) => {
  const { name, depth, networkLatency } = player;
  return (
    <div className="mixer-control-header">
      <div className="mixer-control-header__depth">
        <DepthIcon depth={depth + networkLatency} />
        {(depth + networkLatency).toFixed(0)} ms
      </div>

      <div className="mixer-control-header__title">
        {name}
      </div>
    </div>
  );
};
