import ReactDOM from "react-dom";

import { IconButton } from "../common/IconButton";
import { Recording as RecordingModel } from "../../nation";
import { useToggleState } from "../../hooks/useToggleState";

type Recording = Awaited<ReturnType<typeof RecordingModel.prototype.apiData>>;

interface Props {
  recording: Recording;
  deleteRecording: (recordingId: number) => void;
}

const Modal = ({ recording, toggleShowModal }: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="modal-backdrop" onClick={toggleShowModal} />,
        // @ts-ignore
        document.getElementById("backdrop-root"),
      )}

      {ReactDOM.createPortal(
        <img
          className="modal-content"
          src={`/pi/rawFiles/${recording.id}.jpg`}
          style={{ width: "800px", height: "auto" }}
        />,
        // @ts-ignore
        document.getElementById("overlay-root"),
      )}
    </>
  );
};

export const RecordingListTableData = ({ recording, deleteRecording }: Props) => {
  const [showModal, toggleShowModal] = useToggleState(false);

  const handleDeleteRecording = (e: any) => {
    e.stopPropagation();
    deleteRecording(recording.id);
  };

  return (
    <>
      {showModal && <Modal recording={recording} toggleShowModal={toggleShowModal} />}
      <tr>
        <td>{recording.name}</td>
        <td>{recording.status}</td>
        <td>
          <audio src={recording.locationWav} controls></audio>
        </td>
        <td>
          <a href={recording.locationWav}>Wave</a>
        </td>
        <td>
          <img
            src={`/pi/rawFiles/${recording.id}.jpg`}
            style={{ width: "100px", height: "auto", cursor: "pointer" }}
            title="View stats"
            // @ts-ignore
            onClick={toggleShowModal}
          />
        </td>
        <td>
          <IconButton icon="trash" title="Delete Recording" onClick={handleDeleteRecording} />
        </td>
      </tr>
    </>
  );
};
