import ListGroup from "react-bootstrap/ListGroup";

export default function JamUnit({ jamUnitId, lanIp }: any) {
  return (
    <div style={{ maxHeight: 700, overflow: "auto" }}>
      <ListGroup variant="flush">
        {jamUnitId} {lanIp}
      </ListGroup>
    </div>
  );
}
