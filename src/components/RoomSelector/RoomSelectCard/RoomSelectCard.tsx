import Card from "react-bootstrap/Card";

import { RoomCardTitle } from "./RoomCardTitle";
import { RoomCardButton } from "./RoomCardButton";

interface Props {
  room: any;
  roomToken: string;
  disconnect: () => void;
  joinRoom: (target: any) => void;
}

export const RoomSelectCard = ({ room, roomToken, disconnect, joinRoom }: Props) => {
  return (
    <Card className={`room-select__card ${roomToken === room.token ? "room-select__card--joined" : ""}`}>
      <Card.Body className="room-select__card-body">
        <RoomCardTitle room={room} />

        <RoomCardButton room={room} roomToken={roomToken} disconnect={disconnect} joinRoom={joinRoom} />
      </Card.Body>
    </Card>
  );
};
