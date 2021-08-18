import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const EndGame = () => {
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const users = useSelector((state) => state.gameState.users);
  const clientUser = useSelector((state) => state.user);
  const host = useSelector((state) => state.gameState.host);
  const gameState = useSelector((state) => state.gameState);
  const sortedUsers = users.sort((a, b) => b.score - a.score);
  const haveAllUsersFinished = users.every((user) => user.hasCompletedQuiz);
  const isHost = clientUser === host;
  const playerCards = sortedUsers.map((user, index) => (
    <div key={index}>
      <h2>{index}</h2>
      <h2>{user.name}</h2>
      <h2>{user.score}</h2>
    </div>
  ));
  const handleScores = async () => {
    users.forEach(async (user) => {
      try {
        const url = "http://localhost:3000/highscores";
        const payload = {
          name: user.name,
          category: gameState.category,
          difficulty: gameState.difficulty,
          score: user.score,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const { data } = await axios.post(url, payload, { headers });
      } catch (error) {
        console.log(error);
      }
    });
    setIsScoreSubmitted(true);
  };
  return (
    <>
      {playerCards}
      {haveAllUsersFinished && isHost && (
        <Button onClick={handleScores}>Update Leaderboard!</Button>
      )}
      {isScoreSubmitted && <Redirect to="/highscores" />}
    </>
  );
};

export default EndGame;
