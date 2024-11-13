import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
// import Table from "react-bootstrap/Table";
import ReactMarkdown from "react-markdown";

import { useApi } from "../../hooks/useApi";
import { HandlerContext } from "../../contexts/HandlerContext";
import { SongList } from "../songs/SongList";
import { TransportControl } from "./TransportControl";
import { RoomChat } from "./roomChat";
import { Recording } from "../../utils/roomHandler";
import { SongShow } from "../../nation";

type SongData = Awaited<ReturnType<typeof SongShow.prototype.runWithinTransaction>>;

interface Props {
  token: string;
  setActiveTab: (activeTab: string) => void;
}

export const RoomGroupChat = ({ token, setActiveTab }: Props) => {
  const { jamUnitHandler, roomHandler } = useContext(HandlerContext);
  const { execApi } = useApi();
  const [currentSong, setCurrentSong] = useState<SongData["song"]>();
  const [recordings, setRecordings] = useState<Array<Recording>>([]);

  const [transportStatus, setTransportStatus] = useState<string>("idle");
  const [activeRecording, setActiveRecording] = useState<Recording>({
    date: "",
    name: "",
    size: 0
  });
  const [currentlyPlaying, _setCurrentlyPlaying] = useState<string>("");
  const [peerMessage, setPeerMessage] = useState<any>("");

  useEffect(() => {
    roomHandler.subscribe("RoomGroupChat", distributeInfo);
    return () => {
      roomHandler.unsubscribe("RoomGroupChat");
    };
  }, []);

  useEffect(() => {
    processPeerMessage();
  }, [peerMessage]);

  async function distributeInfo(room: any) {
    // Here we need to catch the events from the roomHandler
    setPeerMessage(room.peerMessage);
    setTransportStatus(room.transport.state);
    setActiveRecording(room.transport.current_file);
    setRecordings(room.recordings);
    // save info from the room events
  }

  function processPeerMessage() {
    if (peerMessage === "") {
      return;
    }
    // Parse the peer message and then do something
    if (peerMessage && peerMessage.message) {
      const chunks = peerMessage.message.split(" ");
      if (chunks[0] === "#loadSong") {
        // this is a message to load a song from the chat room
        execApi(undefined, "/api/1/songs/" + parseInt(chunks[1]), "get", setCurrentSong, "song");
      }
    }
  }

  function roomSongLoad(songId: number) {
    roomHandler.sendPeerMessage({
      speaker: jamUnitHandler.updatedModel.name,
      echo: true,
      message: `#loadSong ${songId}`,
    });
    setActiveTab("song-info");
  }

  return (
    <>
      <Tab.Pane eventKey="transport">
        <Container>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TransportControl
              roomToken={token}
              transportStatus={transportStatus}
              roomHandler={roomHandler}
              recordings={recordings}
              currentlyPlaying={currentlyPlaying}
              activeRecording={activeRecording}
            />
          </div>
        </Container>
      </Tab.Pane>
      <Tab.Pane eventKey="songs">
        <Container>
          <div className="RoomChat" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <div style={{ width: "100%", maxWidth: "46.5rem" }}>
              <SongList displayOnly songLoadFunction={roomSongLoad} />
            </div>
          </div>
        </Container>
      </Tab.Pane>
      <Tab.Pane eventKey="song-info">
        <Container>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {currentSong ? (
              <ReactMarkdown>{currentSong.info}</ReactMarkdown>
            ) : (
              <div>Send a song from the song list to view info here.</div>
            )}
          </div>
        </Container>
      </Tab.Pane>
      <RoomChat token={token} />
    </>
  );
};
