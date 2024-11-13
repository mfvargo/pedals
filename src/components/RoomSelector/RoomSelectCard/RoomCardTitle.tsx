import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

interface Props {
  room: { name: string; port: number };
}

export const RoomCardTitle = ({ room: { name, port } }: Props) => {
  const cardTitle =
    name.length > 34 ? (
      <OverlayTrigger placement="top" overlay={<Tooltip>{name}</Tooltip>}>
        <Card.Title className="room-select__room-name">{name}</Card.Title>
      </OverlayTrigger>
    ) : (
      <Card.Title className="room-select__room-name">{name}</Card.Title>
    );

  return (
    <div>
      {cardTitle}

      <Card.Subtitle className="mb-2 text-muted">(port: {port})</Card.Subtitle>
    </div>
  );
};
