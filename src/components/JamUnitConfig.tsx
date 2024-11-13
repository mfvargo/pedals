import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

import { AudioDevice } from "../client/audioDevice";
import { AudioHardware, UnitModel } from "../models/UnitModel";
import { HandlerContext } from "../contexts/HandlerContext";

interface Props {
  token: string;
}
export default function JamUnitConfig({ token }: Props) {
  const { jamUnitHandler } = useContext(HandlerContext);
  const [audioDevice] = useState<AudioDevice>(new AudioDevice());
  const [audioHardware, setAudioHardware] = useState<AudioHardware>();
  const [deviceOptions, setDeviceOptions] = useState<any>();
  const [cmdOutput, setCmdOutput] = useState<Array<string>>([]);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    jamUnitHandler.subscribe("unit", "jamUnitConfig", distributeUnitInfo);
    jamUnitHandler.getAudioHardwareInfo();
    return () => {
      jamUnitHandler.unsubscribe("unit", "jamUnitConfig");
    };
  }, []);

  useEffect(() => {
    if (audioHardware) {
      audioDevice.loadInfo(audioHardware, jamUnitHandler);
      setDeviceOptions(audioDevice.getAvailableOptions());
    }
  }, [audioHardware]);

  async function distributeUnitInfo(model: UnitModel) {
    setAudioHardware(model.audioHardware);
    if (model.cmdOutput) {
      setCmdOutput([]);
      setCmdOutput(model.cmdOutput.split("\n"));
    }
  }

  const shutdownDevice = async () => {
    await jamUnitHandler.shutdownDevice();
  };

  const rebootDevice = async () => {
    await jamUnitHandler.rebootDevice();
  };

  const onSubmit = async (selectedOption: any) => {
    if (selectedOption.value) {
      await jamUnitHandler.setAudioInputHardware(selectedOption.value);
    }
    if (selectedOption.outVal) {
      await jamUnitHandler.setAudioOutputHardware(selectedOption.outVal);
    } else {
      await jamUnitHandler.setAudioOutputHardware("");
    }
    if (audioDevice) {
      await audioDevice.restartAudioDevice();
    }
    // @ts-ignore
    // document.getElementById("messageForm").reset();
  };

  const onCmdSubmit = async ({ cmd }: any) => {
    await jamUnitHandler.deviceCommand(cmd);
  };

  return (
    <div className="DeviceConfig" key={token + "DeviceConfig"}>
      <div className="deviceSelect">
        Choose your audio device from the dropdown below:
        <br />
        <Select value={null} onChange={onSubmit} options={deviceOptions} />
      </div>

      <div className="buttonField">
        <div>Actions</div>
        <button onClick={shutdownDevice} id={"shutdown_button"}>
          Shutdown
        </button>
        <button onClick={rebootDevice} id={"reboot_button"}>
          Reboot
        </button>
      </div>

      <div className="deviceCommand">
        <div className="commandInput">
          <Form id="deviceCommand" onSubmit={handleSubmit(onCmdSubmit)}>
            <Form.Group>
              <Form.Label>Command</Form.Label>
              <Form.Control autoFocus defaultValue="ls -l" required type="text" {...register("cmd")} />
            </Form.Group>
            <button type="submit">Execute</button>
          </Form>
        </div>

        <div className="commandOutput">
          {cmdOutput.map((line) => (
            <div key={line}>
              {line}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
