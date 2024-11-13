import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

import { Button } from "../common/Button";
import { Song } from "./SongList";

interface Props {
  songToEdit: Song | undefined;
  cancelAddSong: () => void;
  onUpdateSubmit: (data: {}) => void;
  onCreateSubmit: (data: {}) => void;
}

export const AddNewSong = ({ songToEdit, cancelAddSong, onUpdateSubmit, onCreateSubmit }: Props) => {
  const { handleSubmit, register } = useForm();
  const [infoValue, setInfoValue] = useState("");

  useEffect(() => {
    songToEdit && setInfoValue(songToEdit.info);
  }, []);

  return (
    <div className="form-content-container">
      <Form className="form-content" onSubmit={handleSubmit(songToEdit ? onUpdateSubmit : onCreateSubmit)}>
        <Form.Group>
          {songToEdit && (
            <>
              <Form.Label className="form-content__text" htmlFor="songId">
                Song ID
              </Form.Label>
              <Form.Control
                id="songId"
                className="form-content__input"
                type="text"
                readOnly
                value={songToEdit.id}
                {...register("id")}
              />
            </>
          )}

          <Form.Label className="form-content__text" htmlFor="songName">
            Song Name
          </Form.Label>
          <Form.Control
            id="songName"
            className="form-content__input"
            autoFocus
            required
            type="text"
            // @ts-ignore
            defaultValue={songToEdit && songToEdit.name}
            {...register("name")}
          />

          <Form.Label className="form-content__text" htmlFor="songArtist">
            Artist
          </Form.Label>
          <Form.Control
            id="songArtist"
            className="form-content__input"
            type="text"
            // @ts-ignore
            defaultValue={songToEdit && songToEdit.artist}
            {...register("artist")}
          />

          <Form.Label className="form-content__text" htmlFor="songGenre">
            Genre
          </Form.Label>
          <Form.Control
            id="songGenre"
            className="form-content__input"
            type="text"
            // @ts-ignore
            defaultValue={songToEdit && songToEdit.genre}
            {...register("genre")}
          />

          <Form.Label className="form-content__text" htmlFor="songTempo">
            Tempo
          </Form.Label>
          <Form.Control
            id="songTempo"
            className="form-content__input"
            type="number"
            // @ts-ignore
            defaultValue={songToEdit && songToEdit.tempo}
            {...register("tempo")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="form-content__text" htmlFor="songInfo">
            Info
          </Form.Label>
          <Form.Control
            id="songInfo"
            className="form-content__input"
            as="textarea"
            rows={4}
            defaultValue={infoValue}
            {...register("info")}
          />
        </Form.Group>

        <div className="form-content__buttons-container">
          <Button
            className="form-content__button"
            btnText={songToEdit ? "Update" : "Add"}
            title={songToEdit ? "Update song" : "Add song"}
            type="submit"
          />

          <Button
            className="form-content__button"
            btnText="Cancel"
            title="Cancel"
            variant="outline-primary"
            onClick={cancelAddSong}
          />
        </div>
      </Form>
    </div>
  );
};
