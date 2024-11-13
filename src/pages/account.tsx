import { useState, useEffect, useContext } from "react";

import { useApi } from "../hooks/useApi";
import { HandlerContext } from "../contexts/HandlerContext";
import { LoginCard } from "../components/LoginCard/LoginCard";

export default function Account() {
  const { successHandler } = useContext(HandlerContext);
  const [user, setUser] = useState({ firstName: "", lastName: "", email :"" });
  const { loading, execApi } = useApi();

  useEffect(() => {
    execApi(undefined, "/api/1/profile", "get", (response: any) => {
      setUser(response.user);
    });
  }, []);

  const onSubmit = async (data: any) => {
    if (data.password === "") {
      delete data.password;
    }

    // const success = await setAccount(data, setUser, "user");
    execApi(data, "/api/1/profile", "put", (response: { user: any; }) => {
      if (response.user) {
        successHandler.set({ message: "Updated!" });
      }
    });
  };

  return <LoginCard loginType="Update" user={user} loading={loading} onSubmit={onSubmit} isAccountPage />;
}
