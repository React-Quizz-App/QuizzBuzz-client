import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";

const EndGame = () => {
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const users = useSelector((state) => state.gameState.users);
  const clientUser = useSelector((state) => state.user);
  const gameState = useSelector((state) => state.gameState);
  const sortedUsers = users.sort((a, b) => b.score - a.score);
  const haveAllUsersFinished = users.every((user) => user.hasCompletedQuiz);
  const clientScore = users.find(item => item.name === clientUser).score;
  const playerCards = sortedUsers.map((user, index) => (
    <div key={index}>
      <h2>{index+1}</h2>
      <h2>{user.name}</h2>
      <h2>{user.score}</h2>
    </div>
  ));
  const handleScores = async () => {
    try {
      const url = "https://quizzbuzz-api.herokuapp.com/highscores";
      const payload = {
        name: clientUser,
        category: gameState.category,
        difficulty: gameState.difficulty,
        score: clientScore,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const { data } = await axios.post(url, payload, { headers });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsScoreSubmitted(true);
  };
  return (
    <div className="scores-container">
      {playerCards}
      {haveAllUsersFinished && (
        <Button onClick={handleScores}>Update Leaderboard!</Button>
      )}
      {isScoreSubmitted && <Redirect to="/highscores" />}
      {haveAllUsersFinished && <h3>{sortedUsers[0].name} is the winner!</h3>}
    </div>
  );
};

export default EndGame;
