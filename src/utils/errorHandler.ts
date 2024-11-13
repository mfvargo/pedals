import { EventDispatcher } from "./eventDispatcher";

export class ErrorHandler extends EventDispatcher {
  error: Error | string;

  constructor() {
    super();

    this.error = "";

    this.subscribe("_internal", (e: string | Error) => {
      this.error = e;
    });
  }
}
