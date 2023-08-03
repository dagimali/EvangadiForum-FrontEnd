/** @format */

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import userImg from "../../commonResource/Images/icons8-user-50.png";
import { UserContext } from "../../context/UserContext";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import { Button } from "@mui/material";
import config from "../../../config";
const Answers = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [answerData, setAnswerData] = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  //   const [countUp, setCountUp] = useState(0);
  //   const [countDown, setCountDown] = useState(0);
  const { questionId } = useParams();
  // const baseURL = process.env.REACT_APP_base_url;
  //   const handleCountUp = () => setCountUp(countUp + 1);
  //   const handleCountDown = () => setCountDown(countDown + 1);

  useEffect(() => {
    fetch(`${config.base_url}/api/users/allResponses`)
      .then((response) => response.json())
      .then((data) => {
        let filteredResonses = data?.results.filter((item) => {
          return item?.question_id == questionId;
        });
        setAnswers(filteredResonses);
        return () => {
          socket.disconnect();
        };
      });
  }, [answerData]);
  console.log(answers);
  return (
    <div>
      <h2 className="font-bold text-lg text-center">
        Response from the members
      </h2>
      <div className="border-bottom border-gray-400 space-y-1  bg-slate-50 object-end rounded-lg w-[60vw] float-right py-5 ">
        {answers?.map((item) => {
          return (
            <div className="px-3 my-5 border-b-2">
              <div className="flex justify-between ">
                <div className=" pt-5 ">
                  <img src={userImg} alt="" />
                  <small>{item?.user_name}</small>
                </div>
                <p className=" ml-5 pt-3">{item.answer}</p>
                <small className=" text-end text-ellipsis">
                  {item.posted_date}
                </small>
              </div>
              {/* <div className="float-right px-10 pb-5">
                <button onClick={handleCountUp}>
                  <ThumbUpIcon className="text-blue-500" />
                  {`${countUp === 0 ? "" : countUp}`}
                </button>
                <button onClick={handleCountDown}>
                  <ThumbDownIcon className="text-blue-500 mx-2 " />
                  {`${countDown === 0 ? "" : countDown}`}
                </button>
                <Link to="/comment" className="text-orange-400">
                  Comment
                </Link>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answers;
