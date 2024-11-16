import { useContext } from "react";
import Router from "next/router";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";
import { LoginCard } from "../components/LoginCard/LoginCard";

export default function SignIn() {
  const { successHandler, sessionHandler, configHandler } = useContext(HandlerContext);
  const { loading, execApi } = useApi();

  async function onSubmit(data: any) {
    const response = await execApi(data, "/api/1/session", "post");
    if (response.user) {
      configHandler.user = response.user;
      console.log(configHandler);
      successHandler.set({
        message: "Session created",
      });
      window.localStorage.setItem("session:csrfToken", response.csrfToken);
      sessionHandler.set(response.user);
      Router.push("/jamUnitControl");
    }
  };

  const linkInfo = {
    linkPrompt: "New to RTJam Nation?",
    linkText: "Sign Up",
    href: "sign-up",
  };

  return <LoginCard loginType="Sign In" linkInfo={linkInfo} loading={loading} onSubmit={onSubmit} isSignInPage />;
}
