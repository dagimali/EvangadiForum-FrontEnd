/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { TextField } from "@mui/material";
import config from "../../../config";
// const QuestionAnswer = () => {
//   const [singleData, setSingleData] = useState([]);
//   const [answerData, setAnswerData] = useContext(UserContext);
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();
//   const { questionId } = useParams();
//   // const baseURL = process.env.REACT_APP_base_url;
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   // useEffect(() => {
//   //   fetch(`${config.base_url}/api/users/questions`)
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       console.log(data);
//   //       let filteredquestion = data.results.filter((item) => {
//   //         console.log(item);
//   //         return item.question_id == questionId;
//   //       });
//   //       console.log(questionId);
//   //       setSingleData(filteredquestion[0]);
//   //     });
//   // }, []);
//   // console.log(singleData);
//   const handleSubmit = async (e) => {
//     console.log(questionId);
//     e.preventDefault();
//     const filteredQuest = await axios.get(
//       `${config.base_url}/api/users/questions`
//     );
//     console.log(filteredQuest.data.results);
//     let singleItem = filteredQuest.data.results.filter((item) => {
//       console.log(item);
//       console.log(questionID);
//       return item.question_id == questionId;
//     });
//     setSingleData(singleItem[0]);
//     let token = localStorage.getItem("auth-token");

//     let questionID = singleData.question_id;
//     const answerRes = await axios.post(
//       `${config.base_url}/api/users/response/`,
//       {
//         answer: form.answer,
//         questionId: questionID, // Add the question ID to the request body
//       },
//       { headers: { "x-auth-token": token } }
//     );
//     console.log(answerRes);
//     setAnswerData({
//       answer: answerRes.data.answer,
//       questionId: answerRes.data.questionId,
//     });
//     // setForm({});

//     // navigate("/");
//     // e.target.reset();
//   };
//   // console.log(answerData);
//   // console.log(questionID);
//   useEffect(() => {
//     if (answerData.answer) {
//       // Reset the questionData in the context after the question is inserted.
//       // setAnswerData({});
//     }
//   }, [answerData.answer, setAnswerData]);
const QuestionAnswer = () => {
  const [singleData, setSingleData] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const [answerData, setAnswerData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { questionId } = useParams();
  console.log(answerData);
  console.log(userData);
  // const baseURL = process.env.REACT_APP_base_url;

  let token = localStorage.getItem("auth-token");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      // User is not authenticated, handle the situation
      // For example, navigate the user to the login page or show an error message
      navigate("/login");
      return;
    }
    try {
      // Submit the answer
      const answerRes = await axios.post(
        `${config.base_url}/api/users/response/`,
        {
          answer: form.answer,
          questionId: questionId,
        },
        { headers: { "x-auth-token": token } }
      );
      console.log(answerRes);
      // Update the answerData in the context
      setAnswerData((prev) => {
        return {
          ...prev,
          answer: form.answer,
          questionId: questionId,
        };
      });

      // Reset the form after successful submission
      setForm({});

      // Navigate to a different page after successful submission (e.g., go back to the list of questions)
      // navigate("/");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };
  useEffect(() => {
    // Fetch single question data using `questionId`
    const fetchSingleQuestion = async () => {
      try {
        const filteredQuest = await axios.get(
          `${config.base_url}/api/users/questions`
        );
        let singleItem = filteredQuest.data.results.find(
          (item) => item.question_id == questionId
        );
        // console.log(singleItem);
        if (singleItem) {
          setSingleData(singleItem);
        }
      } catch (error) {
        console.error("Error fetching single question:", error);
      }
    };

    fetchSingleQuestion();
  }, [questionId]);
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
          className="border-gray-50 border-2 bg-blue-700 px-4 text-[1.5vw] rounded-md w-1/3 text-gray-100 mt-50 py-2"
        >
          Submit your answer
        </button>
      </form>
    </div>
  );
};

export default QuestionAnswer;
