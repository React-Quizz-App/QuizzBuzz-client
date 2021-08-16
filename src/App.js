import React, { useEffect, useState } from 'react';
import { Landing } from './pages';
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3000';

const App = () => {
  const [socket, setSocket] = useState();

  useEffect(()=>{
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
  }, [])
  // const socket = io(ENDPOINT);

  return (<Landing socket={socket} />);
};

export default App;
