import React from "react";
import SideBar from "./SideBar";

const NavBar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-lg fixed">
        <div className="navbar-start">
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">BloggerHub</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
