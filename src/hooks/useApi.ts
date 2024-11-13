import { useState, useContext } from "react";
import { Client } from "../client/tauri-client";
import { HandlerContext } from "../contexts/HandlerContext";

const client = new Client();

export function useApi() {
  const { errorHandler, sessionHandler } = useContext(HandlerContext);
  const [response, setResponse] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  async function execApi(data = {}, path: string, verb = "get", setter?: Function, setterKey?: string) {
    if (data === null || data === undefined) {
      data = {};
    }

    setLoading(true);

    let apiResponse: { [key: string]: any };
    try {
      apiResponse = await client.action(verb, path, data);
      console.log(apiResponse);
      setResponse(apiResponse);

      if (setter) {
        if (setterKey) {
          setter(apiResponse[setterKey]);
        } else {
          setter(apiResponse);
        }
      }
    } catch (error) {
      console.log(error);
      if (errorHandler) {
        errorHandler.set({ error: error });
      } else {
        console.error(error);
      }
      if (sessionHandler) {
        sessionHandler.set({ error: error });
      }
    } finally {
      setLoading(false);
      // @ts-ignore
      return apiResponse;
    }
  }

  return { loading, execApi, response };
}
