/** @format */
import React, { useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
import { UserContext } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Ask from "./components/Question/Ask";
import QuestionAnswer from "./components/Question/QuestionAnswer";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Nav/Footer";
import SingleQuestion from "./components/Home/SingleQuestion";
import Comment from "./components/Question/Comment";
import config from "../config";
function App() {
  const [userData, setUserData] = useContext(UserContext);
  // const baseURL = process.env.REACT_APP_base_url;
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      // token not in local storage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      // if token exists in localstorage then use auth to verify token and get user info

      const userRes = await axios.get(`${config.base_url}/api/users`, {
        headers: { "x-auth-token": token },
      });
      // set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home logout={logout} />} />
          <Route path="/ask" element={<Ask />} />
          <Route
            path="/questions/:questionId/response/:questionId"
            element={<QuestionAnswer />}
          />
          <Route path="/questions/:questionId" element={<SingleQuestion />} />
          <Route path="/comment" element={<Comment />} />
          {/* <Route
            path="/questions/:questionId/questions/:questionId"
            element={<SingleQuestion />}
          /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
