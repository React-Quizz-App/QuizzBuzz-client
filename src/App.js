import React, { useEffect, useState } from 'react';
import { Landing, WaitingRoom, Game, HighScores } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';
import { changeState, storeSocket, addUser, updateScore, setQuizAsComplete } from './actions';

const App = () => {
  const [socket, setSocket] = useState();
  const dispatch = useDispatch();
  const clientUser = useSelector((state) => state.user);
  const host = useSelector((state) => state.gameState.host);
  const gameState = useSelector((state) => state.gameState);

  // initialise a socket and events to listen for
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    newSocket.on('change state', (state) => {
      dispatch(changeState(state));
    });
    newSocket.on('update opponents score', ({user, score})=>{
      dispatch(updateScore(user, score));
    });
    newSocket.on('update opponent completion', user => {
      dispatch(setQuizAsComplete(user));
    });
    dispatch(storeSocket(newSocket));
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('user joining waiting room', (user) => {
        if (clientUser === host) {
          dispatch(addUser(user));
          let newGameState = { ...gameState };
          newGameState.users.push({ name: user, score: 0, hasCompletedQuiz: false });
          socket.emit('send state to players', newGameState);
        }
      });
    }
  }, [socket, clientUser, host]);

  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/waiting-room">
        <WaitingRoom />
      </Route>
      <Route path="/game">
        <Game />
      </Route>
      <Route path="/highscores">
        <HighScores />
      </Route>
    </Switch>
  );
};

export default App;
