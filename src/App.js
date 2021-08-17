import React, { useEffect } from 'react';
import { Landing } from './pages';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';
import { createGame, storeSocket } from './actions';

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const newSocket = io(ENDPOINT);
    dispatch(storeSocket(newSocket));
    newSocket.on('init state', (state)=>{
      dispatch(createGame(state));
    });
  }, []);

  return (
    <Switch>
      <Route exact path='/'>
        <Landing />
      </Route>
    </Switch>
  );
};

export default App;
