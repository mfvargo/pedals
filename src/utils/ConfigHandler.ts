import { SessionLogin } from "../nation";
type UserInfo = Awaited<ReturnType<typeof SessionLogin.prototype.runWithinTransaction>>;

const hostServer = "localhost:8080";
// const hostServer = "rtjam-nation.com"

export class ConfigHandler {
  api_url: string;
  ws_url: string;
  use_alsa: boolean;
  in_device: string;
  out_device: string;
  user: UserInfo | undefined;

  constructor() {
    this.api_url = "http://" + hostServer ;
    this.ws_url = "ws://" + hostServer;
    this.use_alsa = true;
    this.in_device = "plughw:CODEC";
    this.out_device = "plughw:CODEC";
    this.user = undefined;
  }
}
