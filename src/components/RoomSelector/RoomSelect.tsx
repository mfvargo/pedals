import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { useApi } from "../../hooks/useApi";
import { usePaginator } from "../../hooks/useCommonUi";
import { UnitModel } from "../../models/UnitModel";
import { HandlerContext } from "../../contexts/HandlerContext";
import { Paginator } from "../common/paginator";
import { RoomGroupChat } from "../chatControl/RoomGroupChat";
import { RoomSelectCard } from "./RoomSelectCard/RoomSelectCard";
import { RoomIndex } from "../../nation";

type RoomIndexResponse = Awaited<ReturnType<typeof RoomIndex.prototype.runWithinTransaction>>;

interface Props {
  token: string;
}

export const RoomSelect = ({ token }: Props) => {
  const { jamUnitHandler, errorHandler } = useContext(HandlerContext);
  const { execApi } = useApi();
  const [name, setName] = useState<string>("");
  const [rooms, setRooms] = useState<RoomIndexResponse["data"]>([]);
  const [roomToken, setRoomToken] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(8);
  const [activeTab, setActiveTab] = useState<string>("room");
  const [audioOn, setAudioOn] = useState<boolean>(false);
  const [showRooms, setShowRooms] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState<Number>(0);
  const [showRoomSelector, setShowRoomSelector] = useState<boolean>(false);

  useEffect(() => {
    jamUnitHandler.subscribe("unit", "RoomSelector", distributeInfo);
    distributeInfo(jamUnitHandler.updatedModel);
    return () => {
      jamUnitHandler.unsubscribe("unit", "RoomSelector");
    };
  }, []);

  useEffect(() => {
    loadRooms();
  }, [roomToken, pageInfo, playerCount]);

  useEffect(() => {
    if (roomToken !== "" && !audioOn) {
      // We are connected to the room, but the jam unit has stopped streaming
      errorHandler.set({ error: "Room Connection Lost" });
      disconnect();
    }
  }, [audioOn]);

  async function distributeInfo(unit: UnitModel) {
    console.log(unit);
    setShowRooms(unit.players.length > 0);
    setAudioOn(unit.connected);
    setName(unit.name);
    if (unit.room && unit.room.token) {
      setRoomToken(unit.room.token);
      setRoomName(unit.room.name);
    } else {
      setRoomToken("");
      setRoomName("");
    }
    setPlayerCount(jamUnitHandler.updatedModel.players.length);
  }

  async function disconnect() {
    await execApi({ jamUnitToken: token }, "/api/1/players", "delete");
    await jamUnitHandler.disconnect();
    await jamUnitHandler.reloadUnitInfo();
  }

  async function loadRooms() {
    const result = await execApi({ ...pageInfo, ...{ jamUnitToken: token } }, "/api/1/rooms", "get", setRooms, "data");
    setRecordCount(result.count);
  }

  async function joinRoom(e: any) {
    const { target } = e;
    await disconnect();
    const response = await execApi(
      {
        name: name,
        jamUnitToken: token,
        roomToken: target.id,
      },
      "/api/1/room/join",
      "post",
    );
    await jamUnitHandler.joinRoom(response.player);
  }

  const handleTabSelect = (tab: any) => {
    setActiveTab(tab);
  };

  function handleRoomButtonClick() {
    if (!showRoomSelector) {
      loadRooms();
    }
    setShowRoomSelector((prev) => !prev);
  }

  const loading = <div>Waiting for unit audio to start...</div>;

  const loaded = (
    <div className={`room-select ${showRoomSelector ? "open" : ""}`}>
      <button className="room-select__toggle-button" onClick={handleRoomButtonClick}>
        {showRoomSelector ? "X" : "Rooms"}
      </button>

      <div className="room-select__tab-container">
        <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
          <Row className="g-0">
            <Col sm={2} className="room-select__nav-column g-0">
              <Nav variant="pills" className="room-select__nav flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="room">Room</Nav.Link>
                </Nav.Item>

                {roomToken !== "" && (
                  <>
                    <Nav.Item>
                      <Nav.Link eventKey="transport">Transport</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="songs">Songs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="song-info">Info</Nav.Link>
                    </Nav.Item>
                  </>
                )}
              </Nav>
            </Col>

            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="room">
                  <Container>
                    <Row className={`room-select__header ${roomToken.length > 0 ? "bg-primary text-white" : ""} g-0`}>
                      <Col>{roomToken.length > 0 ? `Connected to ${roomName}` : "Not Connected. Select a room."}</Col>
                    </Row>

                    <Row className="room-select__list g-0">
                      {rooms.map((room) => (
                        <RoomSelectCard
                          key={room.id}
                          room={room}
                          roomToken={roomToken}
                          disconnect={disconnect}
                          joinRoom={joinRoom}
                        />
                      ))}
                    </Row>

                    <Paginator
                      offset={pageInfo.offset}
                      count={recordCount}
                      pageSize={pageSize}
                      changePage={setPageInfo}
                    />
                  </Container>
                </Tab.Pane>

                {roomToken !== "" && <RoomGroupChat token={roomToken} setActiveTab={setActiveTab} />}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
  
  return showRooms ? loaded : loading;
};
