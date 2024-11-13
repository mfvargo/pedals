import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

import { HandlerContext } from "../../../contexts/HandlerContext";
import { IconButton } from "../../common/IconButton";

interface Props {
  boardId: number;
  boardName: string;
  program: number;
  editMode: boolean;
  saveFunc(bCreate: any, opts: any): Promise<void>;
  loadBoard(boardId: number): Promise<void>;
  setBoardName: (oardName: string) => void;
  setEditMode: (editMode: boolean) => void;
  toggleMinimize: () => void;
}

export const PedalBoardSave = ({
  boardId,
  boardName,
  program,
  editMode,
  saveFunc,
  loadBoard,
  setBoardName,
  setEditMode,
  toggleMinimize,
}: Props) => {
  const { jamUnitHandler } = useContext(HandlerContext);
  const { handleSubmit, register } = useForm();
  const [inputText, setInputText] = useState<string>(boardName);
  const [inputProgram, setInputProgram] = useState<number>(program);

  useEffect(() => {
    setInputText(boardName);
  }, [boardName]);

  useEffect(() => {
    setInputProgram(program);
  }, [program]);

  const handleBoardNameChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleProgramChange = (e: any) => {
    setInputProgram(e.target.value);
  };

  const onEdit = () => {
    jamUnitHandler.refreshPedalConfig();
    setEditMode(true);
  };

  
  const onCancel = async () => {
    await setInputText(boardName);
    setEditMode(false);
  };

  const onSubmit = (opts: any) => {
    console.log(opts);
    setBoardName(inputText);
    if (boardId !== -1) {
      // This is a save but they changed the name. so do a save as instead
      saveFunc(false, opts);
    } else {
      saveFunc(true, opts);
    }
    setEditMode(false);
  };

  const handleClearBoardClick = () => {
    loadBoard(-1);
    setBoardName("");
  };

  const editContent = (
    <>
      <Form id={"saveBoard" + boardId} onSubmit={handleSubmit(onSubmit)} className="pedalboard-name__edit-view">
        <Form.Group className="pedalboard-name__input-container">
          <Form.Label htmlFor="boardNameInput" className="sr-only">
            Board Name:
          </Form.Label>

          <div className="pedalboard-name__input-group">
            <Form.Control
              autoFocus
              className="pedalboard-name__input"
              value={inputText}
              required
              id="boardNameInput"
              type="text"
              {...register("name")}
              onChange={handleBoardNameChange}
            />
            <IconButton icon="save" title="Save Board" size={26} type="submit" inverse />
          </div>
          <Form.Check label="Share board with others" type="checkbox" {...register("shared")} />
          <Form.Control
            className="pedalboard-name__input"
            value={inputProgram}
            id="programInput"
            type="number"
            min={0}
            max={127}
            {...register("program")}
            onChange={handleProgramChange}
          />
        </Form.Group>
      </Form>
      <IconButton icon="cancel" title="Cancel" size={26} type="submit" inverse onClick={onCancel} />
    </>
  );

  const viewContent = boardName ? (
    <>
      <div className="pedalboard-name__name-text">
        {boardName}
        <IconButton icon="edit" title="Edit Board" size={20} inverse onClick={onEdit} />
      </div>

      <div>
        <IconButton icon="clear" title="Clear Board" size={26} inverse onClick={handleClearBoardClick} />
      </div>
    </>
  ) : (
    <div className="pedalboard-name__new-board-prompt">Start a new pedalboard by adding a pedal below</div>
  );

  return (
    <div className="pedalboard-name">
      <IconButton icon="tuner" title="Tuner" size={26} inverse onClick={toggleMinimize} />

      {editMode ? editContent : viewContent}
    </div>
  );
};
