/** @format */

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Answers from "../Question/Answers";
import userImg from "../../commonResource/Images/icons8-user-50.png";
import QuestionAnswer from "../Question/QuestionAnswer";
const SingleQuestion = () => {
  const [singleData, setSingleData] = useState([]);

  const { questionId } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/api/users/questions")
      .then((response) => response.json())
      .then((data) => {
        let filteredQuestion = data?.results.filter((item) => {
          // console.log(item);
          return item.question_id == questionId;
        });
        // console.log(questionId);
        // console.log(filteredQuestion);
        setSingleData(filteredQuestion[0]);
      });
  }, []);
  return (
    <div className="space-y-3 w-5/6 mt-36 m-auto min-h-[calc(100vh-280px)] ">
      <div className="border border-gray-400 bg-blue-300 rounded-md p-4 flex">
        <div className="">
          <img src={userImg} alt="" />
          <small>{singleData?.user_name}</small>
        </div>
        <div className=" flex-grow space-x-4 pl-5">
          <h1 className=" font-bold">{singleData?.question}</h1>
          <p className="">{singleData?.question_description}</p>
        </div>
        <div className="space-y-10 items-end">
          <small className="text-gray-700">{singleData.posted_date}</small>
          <div className="items-end"></div>
        </div>
      </div>
      <div className="items-end ml-40 overflow-x-hidden object-cover ">
        <Answers />
      </div>

      <div className="m-auto pt-5">
        <QuestionAnswer />
      </div>
    </div>
  );
};

export default SingleQuestion;
