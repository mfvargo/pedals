import { useContext, useEffect, useState } from "react";
// import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

// import { PedalBoardIndex } from "nPedalBoard";
import { UnitModel } from "../../../models/UnitModel";
import { useApi } from "../../../hooks/useApi";
import { usePaginator, useSearchBar } from "../../../hooks/useCommonUi";
import { HandlerContext } from "../../../contexts/HandlerContext";
// import { Button } from "../../common/Button";
import { Paginator } from "../../common/paginator";
import { BoardListSettings } from "./BoardListSettings";
import { BoardListTable } from "./BoardListTable";
import { PedalBoardIndex } from "../../../nation";

type PedalBoardList = Awaited<ReturnType<typeof PedalBoardIndex.prototype.runWithinTransaction>>;

interface Props {
  channel: number;
  loadBoard(boardId: number): Promise<void>;
  setEditMode: (editMode: boolean) => void;
}

export const BoardListDisplay = ({ channel, loadBoard, setEditMode }: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(40);
  const { searchString, handleSearchChange } = useSearchBar();
  const { execApi } = useApi(); // Talk to the cloud
  const [boardId, setBoardId] = useState<number>(-1); // Says what board is loaded on the pi
  const [visibility, setVisibility] = useState<boolean>(false);
  const [visibleBoards, setVisibleBoards] = useState<PedalBoardList["data"]>([]);
  const [publicBoardsVisible, setPublicBoardsVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<number>(-1);

  useEffect(() => {
    jamUnitHandler.subscribe("boards", `SavedBoardSelector-${channel}`, distributeInfo);
    return () => {
      jamUnitHandler.unsubscribe("boards", `SavedBoardSelector-${channel}`);
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [searchString, publicBoardsVisible, visibility, boardId, pageInfo]);

  async function loadData() {
    const userInfo = await execApi(undefined, "/api/1/profile", "get");
    setCurrentUser(userInfo.user.id);
    const result = await execApi(
      {
        ...pageInfo,
        ...{
          search: searchString,
          shared: publicBoardsVisible,
          order: [
            ["program", "asc"], // program number
            ["shared", "desc"], // Shared boards
            ["name", "asc"], // Then sort alphabetically ascending on name
          ],
        },
      },
      "/api/1/pedalBoards",
      "put",
      setVisibleBoards,
      "data",
    );
    setRecordCount(result.count);
  }

  const onVisibilyToggle = () => {
    setVisibility(!visibility);
  };

  const handlePublicBoardsToggle = () => {
    setPublicBoardsVisible(!publicBoardsVisible);
  };
  function distributeInfo(model: UnitModel) {
    setBoardId(model.boardInfo.loadedBoards[channel].boardId);
  }

  async function deletePedalBoard(id: number) {
    // delete the selected board
    if (id > 0) {
      await execApi(undefined, "/api/1/pedalBoards/" + id, "delete"); // Delete from cloud
      // delete from pedal board if it's loaded
      if (boardId === id) {
        await jamUnitHandler.loadBoardFromConfig(channel, { id: -1, name: "Empty", config: [] });
        jamUnitHandler.reloadUnitInfo(); // resync data from pi
      }
      loadData(); // Reload boards from cloud
    }
  }

  async function copyToMyBoards(boardId: number) {
    const board = visibleBoards.find((b) => b.id === boardId);
    if (board) {
      const result = await execApi(
        {
          name: "Copy of: " + board.name,
          shared: false,
          config: board.config,
        },
        "/api/1/pedalBoards",
        "post",
      );
      jamUnitHandler.loadBoardFromConfig(channel, result.pedalBoard);
      await jamUnitHandler.reloadUnitInfo();
      board.name = "Copied! ";
      loadData();
      setEditMode(true);
    }
  }

  const handleEditClick = async (boardId: number) => {
    await loadBoard(boardId);
    setEditMode(true);
  };

  return (
    <div className="board-list">
      {/* <Button className="board-list__toggle-btn" title="Toggle pedalboards" onClick={onVisibilyToggle}>
        {visibility ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        Pedalboards
      </Button> */}

      <div className="board-list__content-container">
        <div className="board-list__content">
          <BoardListSettings
            publicBoardsVisible={publicBoardsVisible}
            visibility={visibility}
            onVisibilyToggle={onVisibilyToggle}
            handlePublicBoardsToggle={handlePublicBoardsToggle}
            handleSearchChange={handleSearchChange}
          />

          {visibility && (
            <>
              <BoardListTable
                currentUser={currentUser}
                visibleBoards={visibleBoards}
                setVisibility={setVisibility}
                handleEditClick={handleEditClick}
                loadBoard={loadBoard}
                deletePedalBoard={deletePedalBoard}
                copyToMyBoards={copyToMyBoards}
              />
              <Paginator offset={pageInfo.offset} count={recordCount} pageSize={pageSize} changePage={setPageInfo} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
