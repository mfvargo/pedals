import { useContext, useEffect } from "react";
import Router from "next/router";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";

export default function SignOut() {
  const { successHandler, sessionHandler } = useContext(HandlerContext);
  const { loading, execApi } = useApi();

  async function logout() {
    window.localStorage.clear();
    await execApi(undefined, "/api/1/session", "delete")
    window.localStorage.clear();
    successHandler.set({ message: "Signed out" });
    sessionHandler.set({});
    Router.push("/sign-in");
  }
  useEffect(() => {
    logout();
  }, []);

  return <>{loading ? <small>Signing Out...</small> : null}</>;
}
