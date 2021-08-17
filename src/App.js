import React, { useEffect, useState } from 'react';
import { Landing } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';
import { createGame, storeSocket, addUser } from './actions';

const App = () => {
  
  const [socket, setSocket] = useState();
  const dispatch = useDispatch();
  const clientUser = useSelector(state=>state.user);
  const host = useSelector(state => state.gameState.host);
  const gameState = useSelector(state => state.gameState);
  console.log(gameState)

  // initialise a socket and events to listen for
  useEffect(()=>{
    const newSocket = io(ENDPOINT);
    dispatch(storeSocket(newSocket));
    newSocket.on('change state', (state)=>{
      dispatch(createGame(state));
    });
    setSocket(newSocket);
  }, []);

  useEffect(()=>{
    console.log('second useffect', !!socket)
    if (socket){
      socket.on('user joining waiting room', (user) => {
        console.log(clientUser, host);
        if (clientUser === host){
          console.log(`${user} has joined the game`)
          dispatch(addUser(user))
          let newGameState = {...gameState};
          console.log(newGameState);
          newGameState.users.push({name: user, score: 0});
          socket.emit('send state to players', newGameState);
        }
      })
    }
  }, [socket, clientUser, host])

  return (
    <Switch>
      <Route exact path='/'>
        <Landing />
      </Route>
    </Switch>
  );
};

export default App;
