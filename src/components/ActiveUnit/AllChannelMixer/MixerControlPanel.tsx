import { useCallback, useContext, useEffect, useState } from "react";

import { useApi } from "../../../hooks/useApi";
import { Player } from "../../../models/UnitModel";
import { debounce } from "../../../utils/debounce";
import { HandlerContext } from "../../../contexts/HandlerContext";
import { MixerControlHeader } from "./MixerControlHeader";
import { ChannelControlPanel } from "./ChannelControlPanel";

// This is the setting for a channel on a player.
interface SavedSetting {
  volume: number; // Volume setting for the channel
  pan: number; // Stereo pan setting for the channel
  mute: boolean; // Is the channel muted?
}

interface PlayerSettings {
  chanOne: SavedSetting;
  chanTwo: SavedSetting;
}

interface MixerControlPanelProps {
  player: Player;
  roomLeftMute: boolean;
  roomRightMute: boolean;
}

// this is the control that will adjust settings for a player
export const MixerControlPanel = ({ player, roomLeftMute, roomRightMute }: MixerControlPanelProps) => {
  // pull out the fields of player
  const { token } = player;

  const { execApi } = useApi();
  const { jamUnitHandler } = useContext(HandlerContext);
  const [loading, setLoading] = useState<boolean>(true);

  // These are the settings for the player that get saved in the cloud
  const [settings, setSettings] = useState<PlayerSettings>({
    chanOne: {
      volume: player.tracks[0].gain,
      pan: player.tracks[0].pan,
      mute: player.tracks[0].mute,
    },
    chanTwo: {
      volume: player.tracks[1].gain,
      pan: player.tracks[1].pan,
      mute: player.tracks[1].mute,
    },
  });

  // retrieve settings for this player on load up
  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    delayedSaveSettings(settings);
  }, [settings]);

  async function getSettings() {
    const response = await execApi(undefined, "/api/1/playerSettings/" + token, "get");
    if (!response.error) {
      // Merge in the new settings
      let newset = { ...settings, ...response.playerSetting.settings };
      // apply those settings
      setInitialValues(newset);
      // save the new settings
      setSettings((prevState) => ({ ...prevState, ...newset }));
    }
    setLoading(false);
  }

  async function setInitialValues(newset: PlayerSettings) {
    // This function should read the settings and set the mixer to those values
    await jamUnitHandler.setVolume(player.tracks[0].channel, newset.chanOne.volume);
    await jamUnitHandler.setVolume(player.tracks[1].channel, newset.chanTwo.volume);
    await jamUnitHandler.setFader(player.tracks[0].channel, newset.chanOne.pan);
    await jamUnitHandler.setFader(player.tracks[1].channel, newset.chanTwo.pan);
    await jamUnitHandler.setMute(player.tracks[0].channel, newset.chanOne.mute);
    await jamUnitHandler.setMute(player.tracks[1].channel, newset.chanTwo.mute);
  }

  // This is called by the slide controls when they are moved
  async function updateVolume(inputIndex: number, value: number) {
    await jamUnitHandler.setVolume(inputIndex, value);
    updateSettings(inputIndex % 2, "volume", value);
  }

  async function updatePan(inputIndex: number, value: number) {
    await jamUnitHandler.setFader(inputIndex, value);
    updateSettings(inputIndex % 2, "pan", value);
  }

  async function updateMute(inputIndex: number, muted: boolean) {
    console.log("is On " + muted);
    await jamUnitHandler.setMute(inputIndex, muted);
    updateSettings(inputIndex % 2, "mute", muted);
  }
  
  const saveSettings = async (newSettings: PlayerSettings) => {
    await execApi({ settings: newSettings }, "/api/1/playerSettings/" + token, "put");
  };

  // debounce called when slider is in use
  const delayedSaveSettings = useCallback(debounce(saveSettings, 2000), []);

  async function updateSettings(chanNum: number, name: string, value: number | boolean) {
    console.log("settings update");
    // update settings for state
    if (chanNum === 0) {
      setSettings((prevState) => ({ ...prevState, chanOne: { ...prevState.chanOne, [name]: value } }));
    } else if (chanNum === 1) {
      setSettings((prevState) => ({ ...prevState, chanTwo: { ...prevState.chanTwo, [name]: value } }));
    }
  }

  // const { chanOneIcon, channel, channel1, chanTwoIcon, channel2, mute0, fade0, gain0, mute1, fade1, gain1 } = player;
 
  return (
    <div className="panel mixer-control-panel">
      {!loading && (
        <>
          <MixerControlHeader
            player={player}
          />

          <div className="mixer-control-panel__channel-container">
            <ChannelControlPanel
              roomMute={roomLeftMute}
              chanGain={settings.chanOne.volume}
              track={player.tracks[0]}
              updateVolume={updateVolume}
              updatePan={updatePan}
              updateMute={updateMute}
            />

            <ChannelControlPanel
              roomMute={roomRightMute}
              chanGain={settings.chanTwo.volume}
              track={player.tracks[1]}
              updateVolume={updateVolume}
              updatePan={updatePan}
              updateMute={updateMute}
            />
          </div>
        </>
      )}
    </div>
  );
};
