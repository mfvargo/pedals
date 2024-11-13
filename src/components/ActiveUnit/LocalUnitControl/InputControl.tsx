import { useCallback, useContext, useEffect, useState } from "react";
// @ts-ignore
import Slider from "@appigram/react-rangeslider";

import { debounce } from "../../../utils/debounce";
import { useApi } from "../../../hooks/useApi";
import { AudioDevice } from "../../../client/audioDevice";
import { Level, AudioHardware, UnitModel } from "../../../models/UnitModel";
import { RTJamParameters } from "../../../utils/jamUnitHandler";
import { HandlerContext } from "../../../contexts/HandlerContext";
import { LevelMeter } from "../levelMeter";
import { IconButton } from "../../common/IconButton";

export const InputControl = () => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const { execApi } = useApi();
  const defLevel: Level = { level: -60, peak: -60 };

  const [unitSettings, setUnitSettings] = useState<{
    masterVol: number;
    inputGainOne: number;
    inputGainTwo: number;
    inputReverbOne: number;
    inputReverbTwo: number;
    outMixerGain: number;
  }>({
    masterVol: 0,
    inputGainOne: 0,
    inputGainTwo: 0,
    inputReverbOne: 0,
    inputReverbTwo: 0,
    outMixerGain: 0,
  });

  const [audioDevice] = useState<AudioDevice>(new AudioDevice());
  const [audioHardware, setAudioHardware] = useState<AudioHardware>();
  const [unitToken, setUnitToken] = useState<string>();
  const [_unitName, setUnitName] = useState<string>();
  const [masterLevel, setMasterLevel] = useState<Level>(defLevel);
  const [showIO, setShowIo] = useState<boolean>(false)

  const hasIO = audioDevice && (audioDevice.inputName || audioDevice.outputName)

  useEffect(() => {
    jamUnitHandler.subscribe("levels", "inputControl", distributeUnitInfo);
    return () => {
      jamUnitHandler.unsubscribe("levels", "inputControl");
    };
  }, []);

  useEffect(() => {
    if (audioHardware) {
      audioDevice.loadInfo(audioHardware, jamUnitHandler);
      applySettings();
    }
  }, [audioHardware]);

  // debounce called when slider is in use  // TODO: Have to figure this out...
  // @ts-ignore
  const delayedSavedSettings = useCallback(debounce(saveSettings, 2000), []);

  function distributeUnitInfo(model: UnitModel) {
    setUnitName(model.name);
    setUnitSettings({ ...unitSettings, ...model.settings });
    setAudioHardware(model.audioHardware);
    setMasterLevel(model.masterLevel);
    setUnitToken(model.token);
  }

  async function saveSettings(token: string, settings: any) {
    console.log("saving settings");
    console.log(token);
    if (token) {
      await execApi({ token: token, settings: settings }, "/api/1/jamUnit", "put");
    }
  }

  async function applySettings() {
    // Apply the settings for jamUnit
    await jamUnitHandler.setVolume(RTJamParameters.paramMasterVol, unitSettings.masterVol);
    if (audioDevice) {
      await audioDevice.setInputGain(unitSettings.inputGainOne);
      await audioDevice.setOutputGain(unitSettings.outMixerGain);
    }
  }

  async function masterChange(value: number) {
    await jamUnitHandler.setMasterVolume(value);
    unitSettings.masterVol = value;
    jamUnitHandler.updatedModel.settings = unitSettings;
    delayedSavedSettings(unitToken, unitSettings);
  }

  async function inputChange(value: number) {
    unitSettings.inputGainOne = value;
    await audioDevice.setInputGain(value);
    jamUnitHandler.updatedModel.settings = unitSettings;
    delayedSavedSettings(unitToken, unitSettings);
  }

  async function outputChange(value: number) {
    unitSettings.outMixerGain = value;
    await audioDevice.setOutputGain(value);
    jamUnitHandler.updatedModel.settings = unitSettings;
    delayedSavedSettings(unitToken, unitSettings);
  }

  function toggleIo() {
    setShowIo(prev => !prev)
  }

  return (
    <div className={`panel input-control ${hasIO ? 'input-control--has-io' : ''}`}>
      {
        hasIO && (
          <IconButton
            icon={!showIO ? "settings" : "cancel"}
            title={`${!showIO ? "Show" : "Close"} Input / Output Controls`}
            size={24}
            className="input-control__settings-button"
            onClick={toggleIo}
          />
        )
      }

      {!showIO && (
        <>
          <div className='input-control__slider'>
            <Slider
              value={unitSettings.masterVol}
              min={-60}
              max={12}
              step={0.5}
              orientation="vertical"
              onChange={masterChange}
            />
            MASTER
          </div>

          <LevelMeter signal={masterLevel} orientation="vertical" size='20rem' />
        </>
      )}

      {showIO && audioDevice && audioDevice.inputName && (
        <div className="input-control__slider">
          <Slider
            value={unitSettings.inputGainOne}
            min={0}
            max={100}
            step={0.5}
            orientation="vertical"
            onChange={inputChange}
          />
          INPUT
        </div>
      )}

      {showIO && audioDevice && audioDevice.outputName && (
        <div className="input-control__slider">
          <Slider
            value={unitSettings.outMixerGain}
            min={0}
            max={100}
            step={0.5}
            orientation="vertical"
            onChange={outputChange}
          />
          OUTPUT
        </div>
      )}
    </div>
  );
};
