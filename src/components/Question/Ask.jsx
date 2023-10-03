/** @format */

import { TextField } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "./ASK.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
const Ask = () => {
  const [questionData, setQuestionData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // const baseURL = process.env.REACT_APP_base_url;
  let token = localStorage.getItem("auth-token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionRes = await axios.post(
      `${config.base_url}/api/users/ask`,
      {
        title: form.title,
        question: form.question,
      },
      { headers: { "x-auth-token": token } }
    );
    // setQuestionData({
    //   title: questionRes.data.title,
    //   question: questionRes.data.question,
    // });
    navigate("/");
  };
  useEffect(() => {
    if (questionData?.title) {
      // Reset the questionData in the context after the question is inserted.
      setQuestionData({});
    }
  }, [questionData.title, setQuestionData]);
  return (
    <div className="drop-shadow-2xl pb-12 min-h-[calc(100vh-280px)]">
      <div className="w-1/3 mx-auto mt-20 space-y-2">
        <h1 className="font-bold text-xl">Steps to write a good Question</h1>
        <ul className="list-disc text-sm text-gray-500">
          <li>Summerize your problem in a one-line title</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you tried and what you expect to happen</li>
          <li>Review your question and post it to the site</li>
        </ul>
      </div>
      <div className="pt-12 space-y-2 mx-auto mb-5 text-center m-auto">
        <h1>Ask a public question</h1>
        <small>Go to question page</small>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-2/3 mx-auto space-y-5 flex-col"
      >
        <TextField
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="rounded-lg w-full"
        />
        <TextField
          type="text"
          name="question"
          size="large"
          multiline={true}
          rows={5}
          // margin="normal"
          inputProps={{
            Style: { marginBottom: "100px" },
          }}
          variant="outlined"
          onChange={handleChange}
          placeholder="Question description"
          className="w-full h-[100px] textFieldQ"
        />
        <button
          onClick={handleSubmit}
          className="border-gray-50 border-2 bg-blue-700 px-2 py-2 text-[1.5vw] rounded-md w-[24vw] text-gray-100 mt-50"
        >
          Post your question
        </button>
      </form>
    </div>
  );
};

export default Ask;
