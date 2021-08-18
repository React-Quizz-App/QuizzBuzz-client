import { useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { storeUser } from "../../actions";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const JoinGame = () => {
  const [username, setUsername] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);

  // Handinling the submission of the whole form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(storeUser(username));
    socket.emit("join game", {
      username,
      room: quizCode,
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
        {/* <label htmlFor="username"></label>
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
      /> */}
        <div className="create-input">
          <TextField
            label="Username"
            onChange={handleUsername}
            value={username}
          />
        </div>
        {/* <input type="submit" value="Join Quiz!" /> */}
        <div className="create-input">
          <TextField
            label="Gamecode"
            onChange={handleQuizCode}
            value={quizCode}
          />
        </div>
        <div className="create-input">
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </div>
      </form>
      {isFormSubmitted && <Redirect to="waiting-room" />}
    </>
  );
};

export default JoinGame;
