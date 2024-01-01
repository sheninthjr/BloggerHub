
import React from "react";
import NavBarProfile from "./NavBarProfile";

const NavBar = () => {
  
  return (
    <>
      <div className="navbar bg-black shadow-lg fixed">
          <div className="navbar-start"></div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">BloggerHub</a>
          </div>
          <div className="navbar-end flex space-x-2">
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
            <div className="flex justify-center text-black items-center bg-white rounded-full">
              <NavBarProfile/>
            </div>
          </div>
        </div>
    </>
  );
};

export default NavBar;
