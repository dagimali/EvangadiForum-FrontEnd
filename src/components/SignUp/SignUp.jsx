/** @format */

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
const SignUp = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState({
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setShow({ ...show, showPassword: !show.showPassword });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending data to be registered in the db
      await axios.post("${REACT_APP_base_url}/api/users", form);
      // Once registered the login automaticlly so send the new user info to be logged
      const loginRes = await axios.post(
        `${REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      // set global state with the new user-info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      // set local storage with the token
      localStorage.setItem("auth-token", loginRes.data.token);
      // navigate user to homepage
      navigate("/");
    } catch (err) {
      console.log("Problem =>", err);
    }
  };
  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);
  return (
    <>
      <div className="px-36 w-screen h-full bg-[url('./commonResource/Images/bg-svg-f.svg')] bg-no-repeat bg-cover object-center pt-20">
        <div className="flex justify-between py-5 space-x-5 drop-shadow-2xl px-5 scale-100">
          <div className="flex-1 border-solid object-center bg-white text-center px-5 py-10 rounded-md space-y-2">
            <h1>Join the network</h1>
            <small className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500">
                SIGN IN
              </Link>
            </small>
            <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
              <div>
                <TextField
                  placeholder="Your Email"
                  type="text"
                  size="small"
                  name="email"
                  onChange={handleChange}
                  className="border-2 w-full border-gray-200"
                />
              </div>
              <div className="flex">
                <TextField
                  placeholder="Your First Name"
                  type="text"
                  name="firstName"
                  size="small"
                  onChange={handleChange}
                  className="border-2 w-full border-gray-200"
                />
                <TextField
                  placeholder="Your Last Name"
                  type="text"
                  name="lastName"
                  size="small"
                  onChange={handleChange}
                  className="border-2 w-full border-gray-200"
                />
              </div>

              <div>
                <TextField
                  placeholder="User Name "
                  type="text"
                  name="userName"
                  size="small"
                  onChange={handleChange}
                  className="border-2 w-full border-gray-200"
                />
              </div>

              <div>
                <TextField
                  placeholder="Your Password"
                  type={show.showPassword ? "text" : "password"}
                  name="password"
                  size="small"
                  // value={show.password}
                  onChange={handleChange}
                  className="border-2 w-full border-gray-200"
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
              </div>
              <button className="border-gray-50 border-2 bg-blue-600 px-4 text-lg rounded-md w-full text-gray-100 h-10">
                Agree and Join
              </button>
            </form>
            <Link to="/login" className="text-orange-400 underline space-y-5">
              Alrady have an account
            </Link>
          </div>
          <div className="flex-1 w-32 p-auto m-auto space-y-3">
            <small className="text-orange-400 px-4 text-sm">About</small>
            <h1 className="text-[3vw] font-bold">Evangadi Networks Q&A</h1>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              nisi odio, commodi quae voluptate beatae iste expedita possimus
              eum perspiciatis sint sapiente.
            </p>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate perspiciatis dignissimos eaque blanditiis quis
              voluptates quisquam corrupti.
            </p>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus incidunt laudantium a ipsum iste sapiente reiciendis
              quis hic perspiciatis!
            </p>
            <button className="border-gray-50 border-2 bg-orange-400 px-4 text-lg rounded-md mt-3">
              HOW IT WORKS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
