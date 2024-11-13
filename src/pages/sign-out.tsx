import { useContext, useEffect } from "react";
import Router from "next/router";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";

export default function SignOut() {
  const { successHandler, sessionHandler } = useContext(HandlerContext);
  const { loading, execApi } = useApi();

  useEffect(() => {
    window.localStorage.clear();
    Router.push("/");
    execApi(undefined, "/api/1/session", "delete", () => {
      window.localStorage.clear();
      successHandler.set({ message: "Signed out" });
      sessionHandler.set({});
    });
  }, []);

  return <>{loading ? <small>Signing Out...</small> : null}</>;
}
