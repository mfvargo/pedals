import { useContext } from "react";
import Router from "next/router";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";
import { LoginCard } from "../components/LoginCard/LoginCard";

export default function SignIn() {
  const { successHandler, sessionHandler } = useContext(HandlerContext);
  const { loading, execApi } = useApi();

  const onSubmit = (data: any) => {
    execApi(data, "/api/1/session", "post", (response: any) => {
      if (response.user) {
        successHandler.set({
          message: "Session created",
        });
        window.localStorage.setItem("session:csrfToken", response.csrfToken);
        sessionHandler.set(response.user);
        Router.push("/jamUnits");
      }
    });
  };

  const linkInfo = {
    linkPrompt: "New to RTJam Nation?",
    linkText: "Sign Up",
    href: "sign-up",
  };

  return <LoginCard loginType="Sign In" linkInfo={linkInfo} loading={loading} onSubmit={onSubmit} isSignInPage />;
}
