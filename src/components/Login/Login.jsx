/** @format */

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import config from "../../../config";
import "./Login.css";
// import EvangadiBg from "../../commonResource/Images/bg-svg-f.svg"
const Login = () => {
  const [show, setShow] = useState({
    password: "",
    showPassword: false,
  });
  // const baseURL = process.env.REACT_APP_base_url;
  const handleClickShowPassword = () => {
    setShow({ ...show, showPassword: !show.showPassword });
  };

  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRes = await axios.post(`${config.base_url}/api/users/login`, {
      email: form.email,
      password: form.password,
    });

    // update global state with response from backend(user-info)
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    // set local storage with the token
    localStorage.setItem("auth-token", loginRes.data.token);
    // navigate user to homepage
    navigate("/");
  };
  useEffect(() => {
    if (userData.user) navigate("/");
    if (!userData.user) {
      console.log("user email or Password error");
    }
  }, [userData.user, navigate]);
  return (
    <div className="">
      <div className="pageWidth pt-28 w-full min-h-[calc(100vh-192px)]  bg-[url('./commonResource/Images/bg-svg-f.svg')] bg-no-repeat bg-cover object-center -z-10">
        <div className="nav-internal-wrapper py-2 space-x-5 drop-shadow-2xl scale-100">
          <div className="flex-1 border-solid object-center bg-white text-center px-5 py-10 rounded-md space-y-2">
            <h1>Login to your account</h1>
            <small>
              Don't have an account?{" "}
              <Link to="/signUp" className="text-orange-500">
                Create a new account
              </Link>
            </small>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <TextField
                placeholder="Your Email"
                type="text"
                size="small"
                name="email"
                onChange={handleChange}
                className="border-2 w-full border-gray-200"
              />
              <TextField
                placeholder="Your Password"
                type={show.showPassword ? "text" : "password"}
                name="password"
                size="small"
                // value={show.password}
                onChange={handleChange}
                className="border-2 border-gray-200 textField"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {show.showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <button className="border-gray-50 border-2 bg-orange-400 px-4 text-lg rounded-md w-1/3 m-auto">
                Login
              </button>
            </form>
            <Link to="/signUp" className="text-orange-400 underline space-y-5">
              Create an account?
            </Link>
          </div>
          <div className="flex-1 p-auto m-auto space-y-3 w-full">
            <small className="text-orange-400 px-4 text-sm">About</small>
            <h1 className="text-[3vw] font-bold">Evangadi Networks Q&A</h1>
            <p className="text-sm text-gray-600">
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className="text-sm text-gray-600">
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <button className="border-gray-50 border-2 bg-orange-400 px-4 text-lg rounded-md mt-3">
              HOW IT WORKS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
