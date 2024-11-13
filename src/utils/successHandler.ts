import { EventDispatcher } from "./eventDispatcher";

export class SuccessHandler extends EventDispatcher {
  message: string;

  constructor() {
    super();

    this.message = "";

    this.subscribe("_internal", (m: string) => {
      this.message = m;
    });
  }
}
