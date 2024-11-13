import ReactMarkdown from "react-markdown";

import { useToggleState } from "../../hooks/useToggleState";
import { IconButton } from "../common/IconButton";
import { Song } from "./SongList";

interface Props {
  song: Song;
  displayOnly: boolean;
  findSongToEdit: (songId: number) => void;
  deleteSong: (songId: number) => void;
}

export const SongListTableData = ({ song, displayOnly, findSongToEdit, deleteSong }: Props) => {
  const [songInfoVisible, toggleSongInfoVisible] = useToggleState(false);

  const handleFindSong = (e: any) => {
    e.stopPropagation();
    findSongToEdit(song.id);
  };

  const handleDeleteSong = (e: any) => {
    e.stopPropagation();
    deleteSong(song.id);
  };

  const handleRowClick = () => {
    // @ts-ignore
    song.info && toggleSongInfoVisible();
  };

  return (
    <>
      <tr className="pointer" onClick={handleRowClick}>
        <td>
          <div className="d-flex">
            {song.info &&
              (songInfoVisible ? (
                // @ts-ignore
                <IconButton icon="arrowUp" title="Hide song info" onClick={toggleSongInfoVisible} />
              ) : (
                // @ts-ignore
                <IconButton icon="arrowDown" title="Show song info" onClick={toggleSongInfoVisible} />
              ))}
            {song.name}
          </div>
        </td>
        <td>{song.artist}</td>
        <td>{song.genre}</td>
        <td>{song.tempo}</td>
        {displayOnly && (
          <td>
            <IconButton icon="send" title="Send song" onClick={handleFindSong} />
          </td>
        )}

        {!displayOnly && (
          <>
            <td>{song.canEdit && <IconButton icon="edit" title="Edit song" onClick={handleFindSong} />}</td>
            <td>{song.canDelete && <IconButton icon="trash" title="Delete song" onClick={handleDeleteSong} />}</td>
          </>
        )}
      </tr>

      {songInfoVisible && (
        <tr>
          <td colSpan={7}>
            <ReactMarkdown>{song.info}</ReactMarkdown>
          </td>
        </tr>
      )}
    </>
  );
};
