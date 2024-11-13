import { useState } from "react";
import { ChannelEffect } from "./ChannelEffect";
import { ChannelSelector } from "./ChannelSelector";

export const PedalBoardCtrlPanel = () => {
  const [selectedPedalBoard, setSelectedPedalBoard] = useState<number>(0);

  return (
    <div>
      {/* <div className="ChannelEffectsTitle">Channel Effects Box</div> */}

      <ChannelSelector activeChannel={selectedPedalBoard} makeActive={setSelectedPedalBoard} />

      <div className="channelEffects">
        {selectedPedalBoard === 0 && <ChannelEffect channel={0} />}
        {selectedPedalBoard === 1 && <ChannelEffect channel={1} />}
      </div>
    </div>
  );
};
