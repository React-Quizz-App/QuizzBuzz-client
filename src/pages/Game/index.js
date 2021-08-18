import React, { useEffect, useState } from 'react';
import { Question } from '../../components';
import { useSelector } from 'react-redux';

//To do:
// - Build question page in JSX [ x ]
// - Take JSX and set new component []
// - Shuffle answers in array
// - Create onClick handling of answer - WITHOUT MAKING ANSWER CLEAR
// - Have a set timeout which prompts next question, tells us if answer is correct and disables user from clicking a new button
// - Note: Easier way to do this would be to not alert user of whether they answered correctly during the game

const Game = () => {
  const questionNumber = useSelector(state => state.gameState.questionNumber);
  const gameQuestions = useSelector(state => state.gameState.questions);
  const gameUsers = useSelector(state => state.gameState.users);

  const userElements = gameUsers.map(user => <div key={user.name}>
    <h2>{user.name}</h2>
    <h3>{user.score}</h3>
  </div>)
  
  return (
    <div>
       <Question data={gameQuestions[questionNumber-1]}  />
       {userElements}
    </div>
  )
};

export default Game;
