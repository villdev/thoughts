import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSearch,
  faPlus,
  faStar,
  faStickyNote,
  faTrash,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";

import "./Sidenavbar.scss";
import { NavLink, useHistory } from "react-router-dom";
// import { postRequest } from "./../../utils/apiRequests";
// import { BASE_URL, CREATE_NOTE } from "./../../utils/apiEndpoints";
import { NotesContext } from "./../../context/context";

import Test from "../../images/menu.svg";

const Sidenavbar = () => {
  const notesContext = useContext(NotesContext);
  const history = useHistory();
  const [error, setError] = useState(null);

  // const handleCreateNote = async () => {
  //   const response = await postRequest(`${BASE_URL}${CREATE_NOTE}`);
  //   console.log(response);
  //   if (response.error) {
  //     setError(response.error);
  //     return false;
  //   }
  //   if (response._id) {
  //     notesContext.notesDispatch({
  //       type: "createNoteSuccess",
  //       payload: response,
  //     });
  //     history.push({
  //       pathname: `/all-notes/${response._id}`,
  //       note: response,
  //     });
  //   }
  // };

  return (
    <div className="sidenavbar">
      <div className="sidenavbar-top">
        <div className="sidenavbar-top__hamburger">
          <button>
            {/* <img src={Test} alt="" /> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 11H16V13H4V11ZM4 6H20V8H4V6ZM4 18H11.235V16H4V18Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        {/* <div className="sidenavbar-top__create-note">
          <div className="create-note-btn" onClick={handleCreateNote}>
            <FontAwesomeIcon className="icon" icon={faPlus} />
            <div className="title">New Note</div>
          </div>
        </div> */}
        <div className="sidenavbar-top__menu-item">
          <ul>
            <li>
              <NavLink to="/all-notes">
                {/* <NavLink to={`/all-notes/${notesContext?.notesState[0]?._id}`}> */}
                {/* <FontAwesomeIcon className="icon" icon={faStickyNote} /> */}
                All Notes
              </NavLink>
            </li>

            <li>
              <NavLink to="/trash">
                {/* <NavLink to={`/trash/${notesContext?.notesState[0]?._id}`}> */}
                {/* <FontAwesomeIcon className="icon" icon={faTrash} /> */}
                Trash
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidenavbar-bottom">
        <div className="sidenavbar-bottom__account">
          <div className="avatar bg-red-500 text-white">SK</div>

          <div className="profile-title">
            Shobhit K
            <FontAwesomeIcon className="icon" icon={faAngleDown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
