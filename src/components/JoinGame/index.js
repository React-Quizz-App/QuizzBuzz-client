import { useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { storeUser } from "../../actions";

const JoinGame = () => {
  const [username, setUsername] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket);

  // Handinling the submission of the whole form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(storeUser(username));
    socket.emit('join game', {
      username,
      room: quizCode
    });
    setUsername("");
    setQuizCode("");
    setIsFormSubmitted(true);
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
    <>
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
    { isFormSubmitted && <Redirect to='waiting-room' /> }
    </>
  );
};

export default JoinGame;
