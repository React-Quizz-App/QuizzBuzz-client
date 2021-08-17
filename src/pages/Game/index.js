import React, { useEffect, useState } from "react";
import { Question } from "../../components";
import axios from "axios";

//To do:
// - Build question page in JSX [ x ]
// - Take JSX and set new component []
// - Shuffle answers in array
// - Create onClick handling of answer - WITHOUT MAKING ANSWER CLEAR
// - Have a set timeout which prompts next question, tells us if answer is correct and disables user from clicking a new button
// - Note: Easier way to do this would be to not alert user of whether they answered correctly during the game

const Game = () => {
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchQuizzQuestions() {
      try {
        let { data } = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
        );

        let { results } = data;
        setGameQuestions(results);
      } catch (err) {
        console.warn(err);
      }
    }
    fetchQuizzQuestions();
  }, []);

  console.log(gameQuestions[0]);
  console.log(gameQuestions);

  const handleAnswer = (answer) => {
    setCurrentIndex(currentIndex + 1);
  };

  return gameQuestions.length ? (
    <div>
      <Question
        data={gameQuestions[currentIndex]}
        handleAnswer={handleAnswer}
      />
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Game;
