import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { SongIndex } from "../../nation";
import { useApi } from "../../hooks/useApi";
import { usePaginator, useSearchBar } from "../../hooks/useCommonUi";
import { Button } from "../common/Button";
import { SearchBar } from "../common/SearchBar";
import { Paginator } from "../common/paginator";
import { AddNewSong } from "./AddNewSong";
import { SongListTableData } from "./SongListTableData";

type IndexResponse = Awaited<ReturnType<typeof SongIndex.prototype.runWithinTransaction>>;

interface Props {
  displayOnly?: boolean;
  songLoadFunction?: any;
}

export interface Song {
  id: number;
  name: string;
  artist: string;
  genre: string;
  tempo: number;
  info: any;
  canEdit: boolean;
  canDelete: boolean;
}

export const SongList = ({ displayOnly = false, songLoadFunction = undefined }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [songToEdit, setSongToEdit] = useState<undefined | Song>(undefined);
  const { execApi } = useApi();
  const [songs, setSongs] = useState<IndexResponse["data"]>([]);
  // Pagination Stuff
  const { pageInfo, setPageInfo, recordCount, setRecordCount, pageSize } = usePaginator(8);
  // Search Stuff
  const { searchString, handleSearchChange } = useSearchBar();
  // Order Stuff
  const [orderClause, _setOrderClause] = useState<Array<Array<string>>>([
    ["name", "asc"],
    ["artist", "desc"],
  ]);

  useEffect(() => {
    loadData();
  }, [searchString, pageInfo]);

  async function loadData() {
    const result = await execApi(
      {
        ...pageInfo,
        ...{
          search: searchString,
          order: orderClause,
        },
      },
      "/api/1/songs",
      "put",
      setSongs,
      "data",
    );
    if (result && !result.error) {
      setRecordCount(result.count);
    }
  }

  async function deleteSong(id: number) {
    // delete the selected board
    await execApi(undefined, "/api/1/songs/" + id, "delete"); // Delete from cloud
    loadData(); // Reload boards from cloud
  }

  const findSongToEdit = (songId: number) => {
    if (displayOnly) {
      if (songLoadFunction) {
        songLoadFunction(songId);
      }
    } else {
      const selectedSong = songs.find((song) => song.id === songId);
      setSongToEdit(selectedSong);
      setEditMode(true);
    }
  };

  async function updateSong(attributes: any) {
    await execApi(attributes, `/api/1/songs/${attributes.id}`, "put");
    loadData(); // reload boards
  }

  async function createSong(attributes: any) {
    await execApi(attributes, "/api/1/songs", "post");
    loadData(); // reload boards
  }

  const resetSongForm = () => {
    setEditMode(false);
    setSongToEdit(undefined);
  };

  const onCreateSubmit = (data: any) => {
    createSong(data);
    resetSongForm();
  };

  const onUpdateSubmit = (data: any) => {
    updateSong(data);
    resetSongForm();
  };

  return (
    <div key="SongList">
      {!displayOnly && <h3>Songs</h3>}

      {editMode ? (
        <AddNewSong
          songToEdit={songToEdit}
          cancelAddSong={resetSongForm}
          onCreateSubmit={onCreateSubmit}
          onUpdateSubmit={onUpdateSubmit}
        />
      ) : (
        <>
          <SearchBar placeholder="Search Songs" label="Search Songs" onChange={handleSearchChange} />

          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Tempo</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>

            <tbody>
              {songs.map((song) => (
                <SongListTableData
                  key={song.id}
                  song={song}
                  displayOnly={displayOnly}
                  findSongToEdit={findSongToEdit}
                  deleteSong={deleteSong}
                />
              ))}
            </tbody>
          </Table>

          <Paginator offset={pageInfo.offset} count={recordCount} pageSize={pageSize} changePage={setPageInfo} />

          {!displayOnly && <Button btnText="&#43; New Song" title="Add new song" onClick={() => setEditMode(true)} />}
        </>
      )}
    </div>
  );
};
