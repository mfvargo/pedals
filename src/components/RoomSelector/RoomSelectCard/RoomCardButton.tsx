import Badge from "react-bootstrap/Badge";
import { BsPeopleFill } from "react-icons/bs";

import { Button } from "../../common/Button";

interface Props {
  room: any;
  roomToken: string;
  disconnect: () => void;
  joinRoom: (target: any) => void;
}

export const RoomCardButton = ({ room, roomToken, disconnect, joinRoom }: Props) => {
  const cardPlayerCount = (
    <div className="room-select__player-count">
      <BsPeopleFill fontSize={28} />

      <Badge pill bg={room.playerCount > 0 ? "success" : "secondary"} className="room-select__number-badge">
        {room.playerCount}
      </Badge>
    </div>
  );

  const cardButton =
    roomToken === room.token ? (
      <Button className="room-select__button" btnText="Leave" title="Leave room" onClick={disconnect} />
    ) : (
      <Button
        className="room-select__button"
        btnText="Join"
        title="Join room"
        id={room.token}
        variant="outline-primary"
        onClick={joinRoom}
      />
    );

  return (
    <div>
      {cardPlayerCount}

      {cardButton}
    </div>
  );
};
