import { IconButton } from "../common/IconButton";
import { RecordingsList } from "./RecordingsList";
import { RoomHandler, Recording } from "../../utils/roomHandler";

interface Props {
  transportStatus: string;
  roomToken: string;
  roomHandler: RoomHandler;
  recordings: Array<Recording>;
  currentlyPlaying: string;
  activeRecording: Recording;
}

export const TransportControl = ({
  roomToken,
  transportStatus,
  roomHandler,
  recordings,
  currentlyPlaying,
  activeRecording,
}: Props) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="transport-control">
        <IconButton
          icon="list"
          title="List recordings"
          name="listRecordings"
          className="transport-control__button"
          inverse
          onClick={() => roomHandler.listFiles()}
        />

        <IconButton
          icon="save"
          title="Save audio"
          name="saveAudio"
          className="transport-control__button"
          inverse
          disabled={activeRecording?.size == 0}
          onClick={() => roomHandler.saveRecording()}
        />

        <IconButton
          icon="trash"
          title="Delete audio"
          name="deleteAudio"
          className="transport-control__button"
          inverse
          onClick={() => roomHandler.deleteRecording("")}
        />

        <IconButton
          icon="play"
          title="Play audio"
          name="playAudio"
          className={`transport-control__button ${
            transportStatus === "playing" ? "transport-control__button--play" : ""
          }`}
          inverse
          disabled={transportStatus !== "idle"}
          onClick={() => roomHandler.playAudio("", 1)}
        />

        <IconButton
          icon="stop"
          title="Stop audio"
          name="stopAudio"
          className="transport-control__button"
          inverse
          // disabled={transportStatus === "idle"}
          onClick={() => roomHandler.stopAudio()}
        />

        <IconButton
          icon="record"
          title="Record room"
          name="recordRoom"
          className={`transport-control__button ${
            transportStatus === "recording"
              ? "transport-control__button--rec"
              : "transport-control__button--rec-inactive"
          }`}
          inverse
          disabled={transportStatus !== "idle"}
          onClick={() => roomHandler.recordRoom()}
        />
      </div>
      <div>
        {activeRecording?.name} {activeRecording?.size}
      </div>

      <RecordingsList
        roomToken={roomToken}
        recordings={recordings}
        currentlyPlaying={currentlyPlaying}
        transportStatus={transportStatus}
        roomHandler={roomHandler}
      />
    </div>
  );
};
