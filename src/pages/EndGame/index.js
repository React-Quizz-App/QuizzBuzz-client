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
    <div className="each-player-section" key={index}>
      <div className="rank">{index+1}</div>
      <div className="player-name">{user.name}</div>
      <div className="player-score">{user.score}</div>
      <div className="game-status">{user.hasCompletedQuiz ? "Finished" : "Playing"}</div>
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
    <div className="end-game-page">
      <div className="outer-container">
        <div className="inner-container">
          <div className="scoreboard-section">
            <div className="scoreboard-heading"><h1>Score Board</h1></div>
            <div className="scoreboard">
              <div className="scoreboard-scroll-area">{playerCards}</div>
              {haveAllUsersFinished && <h3 className="winner"><span className="winner-name">{sortedUsers[0].name}</span> is the winner!</h3>}
              {haveAllUsersFinished && (
                <Button onClick={handleScores} className="add-high-score">Add High Score!</Button>
              )}
              {isScoreSubmitted && <Redirect to="/highscores" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
