import React from 'react';
import { Question } from '../../components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Game = () => {
  const questionNumber = useSelector(state => state.gameState.questionNumber);
  const gameQuestions = useSelector(state => state.gameState.questions);
  const gameUsers = useSelector(state => state.gameState.users);
  const gameState = useSelector(state => state.gameState);
  const socket = useSelector(state => state.socket);
  const clientUser = useSelector(state => state.user);


  const userElements = gameUsers.map(user => <div key={user.name}>
    <h2>{user.name}</h2>
    <h3>{user.score}</h3>
  </div>)

  if (questionNumber > 10){
    socket.emit('complete quiz', {room: gameState.roomName, user: clientUser})
  }
  
  return (
    <>
    {questionNumber <= 10 &&
    <div>
       <Question data={gameQuestions[questionNumber-1]}  />
       {userElements}
    </div>
    }
    {questionNumber > 10 && <Redirect to='game-over'/>}
    </>
  )
};

export default Game;
