import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Link from "next/link";

import { useApi } from "../hooks/useApi";
import { PlayerIndex } from "../nation";

type PlayerIndexResponse = Awaited<ReturnType<typeof PlayerIndex.prototype.runWithinTransaction>>;

export default function Players() {
  const { execApi } = useApi();
  const [players, setPlayers] = useState<PlayerIndexResponse["data"]>([]);
  const [jamUnit, setJamUnit] = useState<any>({});

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    await execApi(undefined, "/api/1/players", "get", setPlayers, "data");
    const response = await execApi(undefined, "/api/1/profile", "get");
    setJamUnit(response.user.defaultUnit);
  }

  return (
    <>
      <h1>Players</h1>
      {players.map((p) => (
        <Row>
          <strong>
            {p.name} - {p.room.name}
          </strong>
          {jamUnit && <Link href={"/jamUnitControl?token=" + jamUnit.token}>&nbsp;Go There</Link>}
        </Row>
      ))}
      <hr />
      <button onClick={loadPlayers} id={"reloadMePlease"}>
        refresh
      </button>
    </>
  );
}
