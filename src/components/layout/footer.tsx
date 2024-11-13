import { useEffect, useState } from "react";

import { useApi } from "../../hooks/useApi";

export default function footer() {
  const [version, setVersion] = useState("~");
  const { loading, execApi } = useApi();

  useEffect(() => {
    execApi(undefined, "/api/1/status", "get", (response: any) => {
      setVersion(response.version);
    });
  }, []);

  return (
    <footer className="footer">
      <hr />

      <small className="footer__link">{loading ? "loading..." : `Connected to api v${version}`}</small>
    </footer>
  );
}
