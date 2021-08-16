import React, { useEffect, useState } from 'react';
import { Landing } from './pages';
import { useDispatch } from 'react-redux';
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';
import { createGame, storeSocket } from './actions';

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const newSocket = io(ENDPOINT);
    dispatch(storeSocket(newSocket));
    newSocket.on('change state', (state)=>{
      console.log('change state event fired');
      dispatch(createGame(state));
    });
  }, []);

  return (<Landing />);
};

export default App;
