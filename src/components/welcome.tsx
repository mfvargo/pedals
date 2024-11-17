import { useContext, useEffect } from "react";
import Router from "next/router";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";

export default function Welcome() {
  const { successHandler, sessionHandler, configHandler } = useContext(HandlerContext);
  const { execApi } = useApi();

  useEffect(() => {
    // on page load, start the unit
    checkSignIn();
  }, []);

  async function checkSignIn() {
    await execApi({}, "/api/1/status", "get");
    const response = await execApi({}, "/api/1/profile", "get");
    if (response?.user) {
      configHandler.user = response.user;
      console.log(configHandler);
      successHandler.set({
        message: "Session created",
      });
      window.localStorage.setItem("session:csrfToken", response.csrfToken);
      sessionHandler.set(response.user);
      Router.push("/jamUnitControl");
    } else {
      Router.push("/sign-in");
    }
  };

  return <div> welcome </div>;
}
