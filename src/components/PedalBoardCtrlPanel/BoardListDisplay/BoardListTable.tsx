import { Dispatch, SetStateAction } from "react";
import Table from "react-bootstrap/Table";
import { MdPublic, MdPublicOff } from "react-icons/md";

import { IconButton } from "../../common/IconButton";
import { PedalBoardIndex } from "../../../nation";

type PedalBoardList = Awaited<ReturnType<typeof PedalBoardIndex.prototype.runWithinTransaction>>;

interface Props {
  currentUser: number;
  visibleBoards: PedalBoardList["data"];
  setVisibility: Dispatch<SetStateAction<boolean>>;
  handleEditClick: (boardId: number) => void;
  loadBoard(boardId: number): Promise<void>;
  deletePedalBoard: (id: number) => void;
  copyToMyBoards: (boardId: number) => void;
}

export const BoardListTable = ({
  currentUser,
  visibleBoards,
  setVisibility,
  handleEditClick,
  loadBoard,
  deletePedalBoard,
}: Props) => {

  const handleButtonClick = (boardId: number, handleButtonAction: (boardId: number) => void, isLoad?: boolean) => {
    if (isLoad) {
      setVisibility(false);
    }
    handleButtonAction(boardId);
  };

  const buttonOptions = [
    {
      icon: "edit",
      title: "Edit Board",
      buttonAction: handleEditClick,
      isLoad: true,
    },
    {
      icon: "load",
      title: "Load Board",
      buttonAction: loadBoard,
      isLoad: true,
    },
    {
      icon: "trash",
      title: "Delete Board",
      buttonAction: deletePedalBoard,
    },
  ];

  return (
    <div className="board-list__table">
      <Table hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Program</th>
            <th>Name</th>
            <th>User</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>

        <tbody>
          {visibleBoards.map((board, i) => (
            <tr key={`boardlist-tr-${board.id}-${i}`}>
              <td>{board.id}</td>
              <td>{board.program || "unassigned"}</td>
              <td className="board-list__board-name">
                {board.shared ? (
                  <MdPublic className="board-list__board-name-icon" title="Public board" />
                ) : (
                  <MdPublicOff className="board-list__board-name-icon" title="Private board" />
                )}
                {board.name}
              </td>

              {board.user.id === currentUser ? (
                <>
                  <td></td>
                  {buttonOptions.map((btn) => (
                    <td key={btn.title}>
                      <IconButton
                        icon={btn.icon}
                        title={btn.title}
                        onClick={() => handleButtonClick(board.id, btn.buttonAction, btn.isLoad)}
                      />
                    </td>
                  ))}
                </>
              ) : (
                <>
                  <td>{board.user.name}</td>
                  <td>
                    <IconButton
                      icon="copy"
                      title="Copy Board"
                      onClick={() => handleButtonClick(board.id, loadBoard, true)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
