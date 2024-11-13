import { useContext } from "react";
import Router from "next/router";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";
import { LoginCard } from "../components/LoginCard/LoginCard";

export default function SignUp() {
  const { successHandler } = useContext(HandlerContext);
  const { loading, execApi } = useApi();

  const onSubmit = (data: any) => {
    execApi(data, "/api/1/register", "post", (response: any) => {
      if (response.user) {
        successHandler.set({ message: "User created" });
        Router.push("/sign-in");
      }
    });
  };

  const linkInfo = {
    linkPrompt: "Already have an account?",
    linkText: "Sign In",
    href: "sign-in",
  };

  return <LoginCard loginType="Sign Up" linkInfo={linkInfo} loading={loading} onSubmit={onSubmit} />;
}
