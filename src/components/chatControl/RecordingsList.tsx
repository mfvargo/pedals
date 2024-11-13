import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { AiOutlineCheck } from "react-icons/ai";

import { IconButton } from "../common/IconButton";

import { useApi } from "../../hooks/useApi";
import { RoomHandler, Recording } from "../../utils/roomHandler";

interface ItemProps {
  recording: Recording;
  isLast?: boolean;
}

interface ListProps {
  roomToken: string;
  recordings: Array<Recording>;
  currentlyPlaying: string;
  transportStatus: string;
  roomHandler: RoomHandler;
}

export const RecordingsList = ({
  roomToken,
  recordings,
  currentlyPlaying,
  transportStatus,
  roomHandler,
}: ListProps) => {
  const { execApi } = useApi();
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const saveRecording = async (e: any) => {
    setMessage(`${e.target.name}`);
    console.log(message);
    const result = await execApi(
      {
        name: e.target.name,
        roomToken: roomToken,
      },
      "/api/1/recordings",
      "post",
    );
    console.log(result);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
    }, 1000);
  };

  const RecordingListItem = ({ recording, isLast }: ItemProps) => {
    const isCurrentRecording = currentlyPlaying.includes(recording.name) && transportStatus === "playing";
    const isLastRecording = currentlyPlaying === "last" && transportStatus === "playing";
    const isPlaying = isLast ? isCurrentRecording || isLastRecording : isCurrentRecording;

    return (
      <ListGroup.Item as="li" className="d-flex justify-content-between">
        <IconButton
          icon="play"
          title="Play audio"
          name={`playAudio ${recording.name}`}
          className={`${isPlaying ? "transport-control__button--play" : ""}`}
          onClick={() => roomHandler.playAudio(recording.name, 1)}
        />
        <IconButton
          icon="trash"
          title="Delete audio"
          name={`deleteAudio ${recording.name}`}
          className={`${isPlaying ? "transport-control__button--play" : ""}`}
          onClick={() => roomHandler.deleteRecording(recording.name)}
        />

        {showFeedback && message === recording.name ? (
          <div className="d-flex align-items-center">
            <AiOutlineCheck fontSize={25} />
          </div>
        ) : (
          <IconButton icon="save" title="Save Recording" name={`${recording.name}`} onClick={saveRecording} />
        )}

        <div className="ms-2 me-auto">
          <div className={`${isPlaying ? "fw-bold fst-italic" : ""}`}>{recording.name}</div>
          {recording.date} {recording.size}
        </div>
      </ListGroup.Item>
    );
  };

  return (
    <ListGroup style={{ width: "22rem" }}>
      {recordings.map((recording, i, recs) => {
        if (i + 1 === recs.length) {
          return <RecordingListItem key={recording.name} recording={recording} isLast />;
        } else {
          return <RecordingListItem key={recording.name} recording={recording} />;
        }
      })}
    </ListGroup>
  );
};
