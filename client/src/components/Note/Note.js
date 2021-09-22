import React, { useState, useEffect, useContext } from "react";
import "./Note.scss";
import {
  useLocation,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import { putRequest, deleteRequest } from "./../../utils/apiRequests";
import { BASE_URL, UPDATE_NOTE, DELETE_NOTE } from "./../../utils/apiEndpoints";
import { NotesContext } from "./../../context/context";
import { listFormatDate, noteFormatDate } from "./../../utils/helpers";

import ReactTooltip from "react-tooltip";
import loader from "../../images/bubble_loading.svg";
import { successNotify } from "../../utils/toast";

const Note = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const notesContext = useContext(NotesContext);
  const [updatedAt, setUpdatedAt] = useState("");
  const [isArchive, setIsArchive] = useState(0);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const match = useRouteMatch();

  useEffect(() => {
    if (location.note) {
      setTitle(location.note.title);
      setDesc(location.note.desc);
      setUpdatedAt(location.note.updatedAt);
      setIsArchive(location.note.archive);
    }
  }, [location.note]);

  useEffect(() => {
    if (notesContext.notesState.length > 0) {
      const [selectednote] = notesContext.notesState.filter(
        (e) => e._id === params.id
      );
      if (selectednote) {
        setTitle(selectednote.title);
        setDesc(selectednote.desc);
        setUpdatedAt(selectednote.updatedAt);
        setIsArchive(selectednote.archive);
      }
    }
  }, [notesContext.notesState]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    // setDesc(e.target.value);
    if (!isArchive) {
      setDesc(e.target.value);
    }
  };

  const handleUpdateNote = async (key) => {
    if (!isArchive) {
      setIsSaving(true);
      let query = {};
      if (key == "title") {
        query["title"] = title;
      } else if (key == "desc") {
        query["desc"] = desc;
      }

      const response = await putRequest(
        `${BASE_URL}${UPDATE_NOTE}${params.id}`,
        query
      );
      if (response.error) {
        setError(response.error);
        setIsSaving(false);
        return false;
      }
      notesContext.notesDispatch({
        type: "updateNoteSuccess",
        payload: response,
        id: params.id,
      });
      setIsSaving(false);
    }
  };

  const handleArchiveNote = async () => {
    let query = {
      archive: 1,
    };
    const response = await putRequest(
      `${BASE_URL}${UPDATE_NOTE}${params.id}`,
      query
    );
    if (response.error) {
      setError(response.error);
      return false;
    }
    successNotify("Note deleted");
    notesContext.notesDispatch({ type: "archiveNoteSuccess", id: params.id });
    // resetState();
    // history.push(`/all-notes`);
    if (notesContext.notesState.length > 1) {
      history.push({
        pathname: `/all-notes/${notesContext.notesState[1]._id}`,
        note: notesContext.notesState[1],
      });
    } else {
      history.push(`/all-notes/`);
    }
  };

  const handleUnArchiveNote = async () => {
    let query = {
      archive: 0,
    };

    const response = await putRequest(
      `${BASE_URL}${UPDATE_NOTE}${params.id}`,
      query
    );
    if (response.error) {
      setError(response.error);
      return false;
    }
    successNotify("Restored note!");
    notesContext.notesDispatch({ type: "archiveNoteSuccess", id: params.id });
    // resetState();
    // history.push(`/trash`);
    if (notesContext.notesState.length > 1) {
      history.push({
        pathname: `/trash/${notesContext.notesState[1]._id}`,
        note: notesContext.notesState[1],
      });
    } else {
      history.push(`/trash/`);
    }
  };

  const handleDeleteNote = async () => {
    const response = await deleteRequest(
      `${BASE_URL}${DELETE_NOTE}${params.id}`
    );
    if (response.error) {
      setError(response.error);
      return false;
    }
    successNotify("Deleted permanently.");
    notesContext.notesDispatch({ type: "deleteNoteSuccess", id: response });

    // history.push("/trash");
    // console.log(notesContext.notesState[0].title);
    // history.go(0);
    if (notesContext.notesState.length > 1) {
      history.push({
        pathname: `/trash/${notesContext.notesState[1]._id}`,
        note: notesContext.notesState[1],
      });
    } else {
      history.push(`/trash/`);
    }
  };

  const resetState = () => {
    setTitle("");
    setDesc("");
    setUpdatedAt("");
    setIsArchive(0);
    setError(null);
    // setTitle(notesContext.notesState[0].title);
    // setDesc(notesContext.notesState[0].desc);
    // setUpdatedAt(notesContext.notesState[0].updatedAt);
    // setIsArchive(notesContext.notesState[0].archive);
    // setError(null);
    // if (match.url == "/all-notes") {
    //     endpoint = GET_ALL_NOTES;
    //   } else if (match.url == "/trash") {
    //     endpoint = GET_TRASH_NOTES;
    //   } else {
    //     return;
    //   }
    // if (notesContext.notesState.length > 0) {
    //   history.push({
    //     pathname: `${match.url}/${notesContext.notesState[0]._id}`,
    //     note: notesContext.notesState[0],
    //   });
    // }
  };

  return (
    <div className="note">
      <div className="note__header">
        <div className="head">
          <input
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
            onBlur={() => handleUpdateNote("title")}
            readOnly={isArchive}
          />
          <div className="note__header-action-btn">
            {!isArchive ? (
              <div
                className="action-btn"
                onClick={handleArchiveNote}
                data-tip={"Delete"}
                data-for={"headerActionBtns"}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                    fill="black"
                  />
                </svg>
              </div>
            ) : (
              <>
                <div
                  className="action-btn"
                  onClick={handleUnArchiveNote}
                  data-tip={"Undo Delete"}
                  data-for={"headerActionBtns"}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.34 4.46801H7.34V7.02501C8.42127 6.1765 9.7284 5.66509 11.0984 5.55454C12.4684 5.44399 13.8406 5.7392 15.0439 6.40335C16.2473 7.06751 17.2284 8.07122 17.8651 9.28931C18.5018 10.5074 18.7658 11.886 18.6242 13.2531C18.4825 14.6202 17.9416 15.9154 17.0688 16.9771C16.1959 18.0389 15.0299 18.8202 13.7159 19.2236C12.402 19.627 10.9984 19.6346 9.68019 19.2456C8.36195 18.8566 7.18739 18.0881 6.303 17.036L7.922 15.851C8.56389 16.5739 9.40157 17.0951 10.3336 17.3517C11.2656 17.6083 12.2521 17.5892 13.1735 17.2967C14.0949 17.0042 14.9117 16.4509 15.5251 15.7037C16.1386 14.9566 16.5222 14.0476 16.6297 13.0869C16.7372 12.1262 16.5638 11.1549 16.1307 10.2907C15.6975 9.42643 15.0231 8.70629 14.1891 8.21744C13.3551 7.72859 12.3973 7.49199 11.4316 7.53628C10.4659 7.58058 9.53375 7.90387 8.748 8.46701H11.339V10.467H5.339V4.46701L5.34 4.46801Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div
                  className="action-btn"
                  onClick={handleDeleteNote}
                  data-tip={"Delete"}
                  data-for={"headerActionBtns"}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8.46 11.88L9.87 10.47L12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="">
          <div className="note__header-date">
            Last edited: {listFormatDate(updatedAt)}
            {isSaving && (
              <span className="loader-wrapper">
                Saving <img src={loader} alt="" />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="note__body">
        <div className="note__body-content">
          <textarea
            value={desc}
            placeholder="Start writing"
            onChange={handleDescChange}
            onBlur={() => handleUpdateNote("desc")}
            readOnly={isArchive}
          />
        </div>
      </div>
      <ReactTooltip
        id={"headerActionBtns"}
        className="tooltip"
        place="bottom"
        effect="solid"
        delayShow={300}
        backgroundColor="#373d41"
      />
    </div>
  );
};

export default Note;
