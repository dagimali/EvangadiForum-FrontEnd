/** @format */

import React, { useEffect, useContext } from "react";
import navImg from "../../commonResource/Images/evangadi-logo-home.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Nav = () => {
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
  return (
    <div className="px-36 w-full bg-white fixed top-0">
      <nav className="flex justify-between my-5">
        {userData.user ? (
          <Link to="/">
            {" "}
            <img src={navImg} alt="" />
          </Link>
        ) : (
          <Link to="/login">
            <img src={navImg} alt="" />
          </Link>
        )}
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
          <div className="pt-2  text-gray-700 text-sm">
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
        </div>
      </nav>
    </div>
  );
};
export default Nav;
