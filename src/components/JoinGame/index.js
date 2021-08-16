import { useState } from "react";
import React from "react";

const JoinGame = () => {
  const [username, setUsername] = useState("");
  const [quizCode, setQuizCode] = useState("");

  // Handinling the submission of the whole form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUsername("");
  };

  // Handling the username
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  //Handling the quiz code
  const handleQuizCode = (e) => {
    setQuizCode(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="username"></label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Please enter a username"
        onChange={handleUsername}
      />
      <input
        type="text"
        id="quizCode"
        name="quizCode"
        placeholder="Please enter the Code for the Quiz you would like to join."
        onChange={handleQuizCode}
      />
      <input type="submit" value="Join Quiz!" />
    </form>
  );
};

export default JoinGame;
