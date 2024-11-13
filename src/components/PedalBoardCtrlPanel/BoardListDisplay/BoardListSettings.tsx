import Form from "react-bootstrap/Form";

import { SearchBar } from "../../common/SearchBar";

interface Props {
  publicBoardsVisible: boolean;
  visibility: boolean;
  onVisibilyToggle: () => void;
  handlePublicBoardsToggle: () => void;
  handleSearchChange: (e: {}) => void;
}

export const BoardListSettings = ({
  publicBoardsVisible,
  visibility,
  onVisibilyToggle,
  handlePublicBoardsToggle,
  handleSearchChange,
}: Props) => {
  return (
    <div className="board-list__settings">
      <Form.Group className="mb-3 board-list__check-container">
        <Form.Check type="checkbox" label="Show Saved Boards" checked={visibility} onChange={onVisibilyToggle} />

        {visibility && (
          <Form.Check
            type="checkbox"
            label="Show public boards"
            checked={publicBoardsVisible}
            onChange={handlePublicBoardsToggle}
          />
        )}
      </Form.Group>

      {visibility && <SearchBar placeholder="Search Pedalboards" label="Search Boards" onChange={handleSearchChange} />}
    </div>
  );
};
