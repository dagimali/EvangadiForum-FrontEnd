/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { TextField } from "@mui/material";

const QuestionAnswer = () => {
  const [singleData, setSingleData] = useState([]);

  const [answerData, setAnswerData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { questionId } = useParams();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetch("${REACT_APP_base_url}/api/users/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let filteredquestion = data.results.filter((item) => {
          console.log(item);
          return item.question_id == questionId;
        });
        console.log(questionId);
        setSingleData(filteredquestion[0]);
      });
  }, []);
  console.log(singleData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("auth-token");

    let questionID = singleData.question_id;
    const answerRes = await axios.post(
      `${REACT_APP_base_url}/api/users/response/`,
      {
        answer: form.answer,
        questionId: questionID, // Add the question ID to the request body
      },
      { headers: { "x-auth-token": token } }
    );
    console.log(answerRes);
    // setAnswerData({
    //   answer: answerRes.data.answer,
    //   questionId: answerRes.data.questionId,
    // });
    setForm({});

    // navigate("/");
    e.target.reset();
  };
  // console.log(answerData);
  // console.log(questionID);
  useEffect(() => {
    if (answerData.answer) {
      // Reset the questionData in the context after the question is inserted.
      setAnswerData({});
    }
  }, [answerData.answer, setAnswerData]);
  return (
    <div className=" min-h-[calc(100vh-192px)]">
      <div className="text-center font-bold">
        <h1>{singleData.question}</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-2/3 mx-auto space-y-5 flex-col"
      >
        <TextField
          type="text"
          name="answer"
          size="large"
          multiline={true}
          rows={5}
          // margin="normal"
          inputProps={{
            Style: { marginBottom: "100px" },
          }}
          variant="outlined"
          onChange={handleChange}
          placeholder="Response"
          className="w-full h-[100px] textFieldQ"
        />
        <button
          onClick={handleSubmit}
          className="border-gray-50 border-2 bg-blue-700 px-4 text-lg rounded-md w-1/3 text-gray-100 mt-50"
        >
          Submit your answer
        </button>
      </form>
    </div>
  );
};

export default QuestionAnswer;
