import React, { useEffect, useState } from 'react';
import { Landing } from './pages';
import { useDispatch } from 'react-redux';
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';
import { createGame } from './actions';

const App = () => {
  const [socket, setSocket] = useState();
  const dispatch = useDispatch();

  useEffect(()=>{
    const newSocket = io(ENDPOINT);
    newSocket.on('change state', (state)=>{
      console.log('change state event fired');
      dispatch(createGame(state));
    });
    setSocket(newSocket);
  }, []);

  return (<Landing socket={socket} />);
};

export default App;
