/** @format */

import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../commonResource/Images/icons8-user-50.png";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [list0fQuestions, setListofQuestions] = useState([]);
  const navigate = useNavigate();
  const handleRequest = () => {
    navigate("/ask");
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/users/questions")
      .then((response) => response.json())
      .then((data) => {
        setListofQuestions(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
    // if (!list0fQuestions) navigate("/login");
  }, []);
  // console.log(list0fQuestions);
  return (
    <div className="mx-52 bg-gray-200">
      <div className="flex justify-between pt-20 mx-10">
        <button
          onClick={handleRequest}
          className="border-gray-50 border-2 bg-blue-400 px-4 text-lg rounded-md"
        >
          Ask Question
        </button>
        <h1 className="font-bold text-xl text-gray-900">
          Welcome: {userData.user?.display_name}
        </h1>
      </div>
      <div className="space-y-3 w-3/4 object-center mx-auto min-h-[calc(100vh-272px)] pt-4">
        {list0fQuestions?.toReversed().map((item, i) => {
          return (
            <Link to={`questions/${item.question_id}`}>
              <div className="border border-gray-400  bg-slate-50 rounded-md p-4 flex ">
                <div className="flex justify-between w-11/12 mr-8">
                  <div className="">
                    <img src={userImg} alt="" />
                    <small>{item.user_name}</small>
                  </div>

                  <h1 className=" font-bold ">{item.question}</h1>

                  <small className="align-text-bottom items-baseline">
                    {item.posted_date}
                  </small>
                </div>

                <ArrowForwardIosOutlinedIcon className="left-0 align-middle mt-5 w-1/12" />

                {/* <p className="pos">{item.question_description}</p> */}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
