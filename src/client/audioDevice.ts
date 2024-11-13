import { JamUnitHandler } from "../utils/jamUnitHandler";
import { AudioHardware } from "../models/UnitModel";

export class AudioDevice {
  static deviceOptions = [
    { value: "hw:USB", driver: "USB", label: "Focusrite Scarlett 2i2" },
    { value: "hw:XUF", driver: "XUF", label: "Behringer X32" },
    { value: "hw:MX5  ", driver: "MX5", label: "Headrush MX5" },
    { value: "hw:IIc", driver: "IIc", label: "MOTU Microbook IIc" },
    { value: "hw:SigmaI2SCodec,1", driver: "SigmaI2SCodec", label: "Sigma I2s Codec", outVal: "hw:SigmaI2SCodec,0" },
    { value: "hw:CODEC", driver: "CODEC", label: "M-AUDIO M-Track Duo", outputName: "PCM" },
    { value: "hw:A96", driver: "A96", label: "PreSonus Audiobox USB96" },
    { value: "hw:Nano", driver: "Nano", label: "Blue Yeti Nano", inputName: "Mic", outputName: "PCM" },
    { value: "hw:X", driver: "X", label: "Blue Yeti X", inputName: "Mic", outputName: "PCM" },
    {
      value: "hw:Microphones",
      driver: "Microphones",
      label: "Blue Yeti Regular",
      inputName: "Mic",
      outputName: "Speaker",
    },
    {
      value: "hw:Microphone",
      driver: "Microphone",
      label: "Blue Yeti Regular v1",
      inputName: "Mic",
      outputName: "Speaker",
    },
    { value: "hw:O12", driver: "O12", label: "Mackie Onyx Artist 1-2", outputName: "'Mix 4'" },
    { value: "hw:Duo", driver: "Duo", label: "Duo Audio", inputName: "Mic", outputName: "Speaker" },
    { value: "hw:Audio", driver: "Audio", label: "Benfei Headphone Adapter", inputName: "Mic", outputName: "Speaker" },
    {
      value: "hw:L41256",
      driver: "L41256",
      label: "L41256 Headphone Adapter",
      inputName: "Mic",
      outputName: "Headphone",
    },
    { value: "hw:AUDIO", driver: "AUDIO", label: "Headphone adapter", outputName: "Headset" },
  ];

  boxApi!: JamUnitHandler;
  activeCard!: string;
  driver!: string;
  installedCards!: Array<Array<string>>;
  inputName!: string;
  outputName!: string;

  async loadInfo(audioHardware: AudioHardware, jamUnitHandler: JamUnitHandler) {
    try {
      this.boxApi = jamUnitHandler;
      // Get driver jack is using
      if (!audioHardware.driver || this.driver == "") {
        // default to the Scarlett.  TODO:  what should this be?
        this.driver = "USB";
      } else {
        // parse the driver string
        this.driver = audioHardware.driver.trim().split(":")[1].split(",")[0];
      }
      // Get cards
      this.installedCards = audioHardware.cardInfo
        .split("\n")
        .filter((r) => r.startsWith("card "))
        .map((r) => r.split(" "));
      // Figure out which card we are using
      const row = this.installedCards.find((r) => r[2] === this.driver);
      if (row) {
        this.activeCard = row[1].split(":")[0];
      }
      const option = AudioDevice.deviceOptions.find((r) => r.driver === this.driver);
      if (option) {
        this.inputName = option.inputName || "";
        this.outputName = option.outputName || "";
      }
    } catch (e) {
      // console.log(e);
    }
  }

  async setInputGain(value: number) {
    if (this.inputName) {
      await this.boxApi.deviceCommand("amixer -c " + this.activeCard + " sset " + this.inputName + " " + value + "%");
    }
    return value;
  }

  async setOutputGain(value: number) {
    if (this.outputName) {
      await this.boxApi.deviceCommand("amixer -c " + this.activeCard + " sset " + this.outputName + " " + value + "%");
    }
    return value;
  }

  async restartAudioDevice() {
    await this.boxApi.deviceCommand("systemctl stop rtjam-sound");
    await this.boxApi.deviceCommand("systemctl stop rtjam-jack");
    await this.boxApi.deviceCommand("systemctl start rtjam-jack");
    await this.boxApi.deviceCommand("systemctl start rtjam-sound");
  }

  getAvailableOptions() {
    if (this.installedCards) {
      return AudioDevice.deviceOptions.filter((opt) => {
        return this.installedCards.map((r) => r[2]).includes(opt.driver);
      });
    }
    return [];
  }
}
