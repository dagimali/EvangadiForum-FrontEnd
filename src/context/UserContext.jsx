/** @format */

import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });
  const [questionData, setQuestionData] = useState({
    title: "",
    question: "",
  });
  const [answerData, setAnswerData] = useState({
    answer: "",
    questionId: "",
  });
  return (
    <UserContext.Provider
      value={
        ([userData, setUserData],
        [questionData, setQuestionData],
        [answerData, setAnswerData])
      }
    >
      {props.children}
    </UserContext.Provider>
  );
};
