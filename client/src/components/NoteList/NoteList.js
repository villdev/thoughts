import React, { useEffect, useState, useContext, useRef } from "react";
import "./NoteList.scss";
import { useRouteMatch, useHistory, NavLink } from "react-router-dom";
import {
  BASE_URL,
  GET_ALL_NOTES,
  GET_TRASH_NOTES,
  CREATE_NOTE,
} from "./../../utils/apiEndpoints";
import { getRequest } from "./../../utils/apiRequests";
import { NotesContext } from "./../../context/context";
import { listFormatDate } from "./../../utils/helpers";

import { postRequest } from "./../../utils/apiRequests";
import { successNotify } from "../../utils/toast";

const NoteList = (props) => {
  const [error, setError] = useState(null);
  const notesContext = useContext(NotesContext);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { title } = props;
  const match = useRouteMatch();
  const history = useHistory();
  useEffect(() => {
    getNotes();
  }, [match.url]);
  // }, []);

  useEffect(() => {
    setFilteredNotes(notesContext.notesState);
  }, [notesContext.notesState]);

  const updateQuery = (e) => {
    const regex = new RegExp(e.target.value, "i");
    const newNotesList = notesContext.notesState.filter((note) =>
      regex.test(note.title)
    );
    setFilteredNotes(newNotesList);
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      inputRef.current.blur();
      setQuery("");
      setFilteredNotes(notesContext.notesState);
    }
  };

  const getNotes = async () => {
    setIsLoading(true);
    let endpoint = "";
    if (match.url == "/all-notes") {
      endpoint = GET_ALL_NOTES;
    } else if (match.url == "/trash") {
      endpoint = GET_TRASH_NOTES;
    } else {
      return;
    }

    const response = await getRequest(`${BASE_URL}${endpoint}`);
    if (response.error) {
      setError(response.error);
      setIsLoading(false);
      return false;
    }
    notesContext.notesDispatch({
      type: "getAllNotesSuccess",
      payload: response,
    });
    setFilteredNotes(response);
    setIsLoading(false);
    if (response.length > 0) {
      history.push({
        pathname: `${match.url}/${response[0]._id}`,
        note: response[0],
      });
    }
  };

  const handleCreateNote = async () => {
    const response = await postRequest(`${BASE_URL}${CREATE_NOTE}`);
    if (response.error) {
      setError(response.error);
      return false;
    }
    successNotify("Note created!");
    if (response._id) {
      notesContext.notesDispatch({
        type: "createNoteSuccess",
        payload: response,
      });
      history.push({
        pathname: `/all-notes/${response._id}`,
        note: response,
      });
    }
  };

  return (
    <div className="note-list">
      <div className="note-list__header">
        <div className="input-text input-text--light container-xs">
          <input
            value={query}
            onChange={updateQuery}
            placeholder="Search Notes"
            type="text"
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <span className="focus-border" />
        </div>
      </div>
      <div className="note-list__body">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NavLink
              key={note._id}
              className="note-card"
              to={{
                pathname: `${match.url}/${note._id}`,
                note,
              }}
            >
              <div className="note-card__head">
                <div className="note-card__title">
                  {note.title !== "" ? note.title : "Title"}
                </div>
                <div className="note-card__desc">
                  {note.desc !== "" ? note.desc : "Start writing..."}
                </div>
              </div>
              <div className="note-card__date">
                {listFormatDate(note.updatedAt)}
              </div>
            </NavLink>
          ))
        ) : (
          <div className="empty-state">No data found</div>
        )}
      </div>
      {!match.url.startsWith("/trash") && (
        <div className="create-note-wrapper">
          <button className="create-note-btn" onClick={handleCreateNote}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteList;
