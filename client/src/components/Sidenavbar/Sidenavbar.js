import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "./Sidenavbar.scss";
import { NavLink } from "react-router-dom";

const Sidenavbar = () => {
  return (
    <div className="sidenavbar">
      <div className="sidenavbar-top">
        <div className="sidenavbar-top__hamburger">
          <button>
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
        <div className="sidenavbar-top__menu-item">
          <ul>
            <li>
              <NavLink to="/all-notes">All Notes</NavLink>
            </li>

            <li>
              <NavLink to="/trash">Trash</NavLink>
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
