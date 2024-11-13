/// This invisible u/x element will subscribe/unsubscribe with the chatRoomHandler and
/// Is responsible for collecting data associated with the broadcastUnit from websock messages
/// It has one special kind of function where it passes latency update messages from the
/// broadcastUnit about people in the room to the jamUnitHandler so it can integrate this
/// with other player information
///
/// There should only ever be one of these on a page...
import { useContext, useEffect } from "react";
import { HandlerContext } from "../../contexts/HandlerContext";

interface Props {
  token: string;
}

export const RoomChat = ({ token }: Props) => {
  const { roomHandler, jamUnitHandler, chatRoomHandler } = useContext(HandlerContext);

  useEffect(() => {
    roomHandler.setApiFunction(sendMessage);
    chatRoomHandler.subscribe(token, "roomChat", processRoomEvent);
    return () => {
      chatRoomHandler.unsubscribe(token, "roomChat");
      roomHandler.setApiFunction(console.log);
      // Clear out any latency dada since we are leaving the room
      jamUnitHandler.setLatencies([]);
    };
  }, []);

  function sendMessage(message: any) {
    chatRoomHandler.sendFunc(token, message);
  }

  /// This is where we get messages from the room and do stuff with them
  /// Knowledge of the room api to the broadcastUnit and to other players
  /// is held in here.
  function processRoomEvent(message: string) {
    try {
      const contents = JSON.parse(message);
      if (contents.speaker !== "RoomChatRobot") {
        // Peer to peer messages  The roomHandler will distribute
        // those out
        roomHandler.setPeerMessage(contents);
        return;
      }
      if (contents.tempo) {
        // this is a response to a tempo command
        // TODO: Handle this
      }
      if (contents.latency) {
        // This is a periodic update from the room broadcast server of round trip
        // network times (averaged) for each party in the room.
        jamUnitHandler.setLatencies(
          contents.latency.map((l: any) => {
            return { clientId: l[0], latency: l[1] };
          }),
        );
      }
      if (contents.transportStatus) {
        // This is an update by the unit as to the transport control status
        roomHandler.setTransportstatus(contents.transportStatus);
      }
      if (contents.listRecordings) {
        roomHandler.setRecordings(contents.listRecordings);
      }
    } catch (error) {
      console.log("chat message format error");
      console.log(error);
    }
  }

  return <div className="RoomUnitEventFetcher"></div>;
};
