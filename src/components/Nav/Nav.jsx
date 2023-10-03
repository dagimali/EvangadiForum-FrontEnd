/** @format */

import React, { useEffect, useContext, useState } from "react";
import navImg from "../../commonResource/Images/evangadi-logo-home.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./nav.css";
import MenuIcon from "@mui/icons-material/Menu";
const Nav = () => {
  const [slideIn, setSlideIn] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const handleClickLogIn = () => {
    if (!userData.user) {
      navigate("/login");
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    navigate("/login");
  };
  const handleSlide = () => {
    setSlideIn(!slideIn);
  };
  return (
    <>
      <div className="pageWidth w-full bg-white fixed top-0 flex justify-between  z-10 py-3">
        <div className="my-2">
          {userData.user ? (
            <Link to="/">
              <img src={navImg} alt="" />
            </Link>
          ) : (
            <Link to="/login">
              <img src={navImg} alt="" />
            </Link>
          )}
        </div>
        <div className="flex justify-between space-x-4">
          <div className="my-2 text-lg nav-list">
            <div className="flex justify-between space-x-4">
              {userData.user ? (
                <Link to="/" className="pt-2 text-gray-700 text-sm">
                  Home
                </Link>
              ) : (
                <Link to="/login" className="pt-2 text-gray-700 text-sm">
                  Home
                </Link>
              )}

              <p className="pt-2  text-gray-700 text-sm">How it works</p>
            </div>
          </div>
          <div className="pt-2  text-gray-700 text-sm">
            <div className="loginMenu">
              {userData.user ? (
                // If user data is available (signed in)
                <button
                  className="bg-blue-600 hover:bg-orange-500 text-white object-cover text-sm w-[10vw] h-8 rounded-md"
                  onClick={logout}
                >
                  Log out
                </button>
              ) : (
                // If user data is not available (not signed in)

                <button
                  onClick={handleClickLogIn}
                  className="bg-blue-600 hover:bg-orange-500 text-white object-cover text-sm w-[10vw] h-8 rounded-md"
                >
                  SIGN IN
                </button>
              )}
            </div>
            <div className="menuIcon py-2">
              <MenuIcon onClick={handleSlide} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`slider text-left w-full fixed bg-orange-400 top-16 z-20 mt-2 ${
          slideIn ? "slide-in" : ""
        }`}
        onClick={handleSlide}
      >
        {slideIn && (
          <div>
            <div className="pl-4 space-y-4 py-3">
              {userData.user ? (
                <Link to="/" className="pt-2 text-gray-700 text-sm ">
                  Home
                </Link>
              ) : (
                <Link to="/login" className="pt-2 text-gray-700 text-sm">
                  Home
                </Link>
              )}
              <p className="pt-2  text-gray-700 text-sm">How it works</p>
              <div className="">
                {userData.user ? (
                  // If user data is available (signed in)
                  <button
                    className="bg-blue-600 hover:bg-orange-500 text-white object-cover text-sm w-[3vw] h-8 rounded-md"
                    onClick={logout}
                  >
                    Log out
                  </button>
                ) : (
                  // If user data is not available (not signed in)

                  <button
                    onClick={handleClickLogIn}
                    className="bg-blue-600 hover:bg-orange-500 text-white object-cover text-sm w-[18vw] h-8 rounded-md"
                  >
                    SIGN IN
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Nav;
