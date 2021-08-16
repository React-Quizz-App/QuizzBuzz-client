import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { createGame } from '../../actions';

const CreateGame = ({socket}) => {
  //States
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [gameCode, setGameCode] = useState('');

  // const dispatch = useDispatch();

  function codeGenerator() {
    const chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
    let result = '';
    for (let i = 0; i < 6; i++) {
      const x = Math.floor(Math.random() * chars.length);
      result += chars[x];
    }
    return result;
  }

  //Username handling
  const handleUserName = (e) => setUserName(e.target.value);

  //Category handling
  const handleCategory = (e) => setCategory(e.target.value);

  //Difficulty handling
  const handleDifficulty = (e) => setDifficulty(e.target.value);

  //Form submission handling
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // updateCity(cityInput);  a function coming from props
    // setUserName('');
    // setCategory('');
    // setDifficulty('');
    // setNumOfPlayers('1');
    let roomName = codeGenerator();
    socket.emit('create game', {
      "room": roomName,
      category,  
      difficulty, 
      "host": userName
    });
    setGameCode(roomName);
  };

  console.log(userName, category, difficulty, gameCode);
  //   const quickCheck = () => console.log(username, gameCode, difficulty, category);

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        id="username"
        name="userName"
        placeholder="Enter your chosen username"
        onMouseOver={(e) => (e.target.placeholder = '')}
        onMouseOut={(e) => (e.target.placeholder = 'Enter your chosen username')}
        value={userName}
        onChange={handleUserName}
      />
      <select name="Category" id="category" onChange={handleCategory}>
        <option value="placeholder">Category</option>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Entertainment: Books">Entertainment: Books</option>
        <option value="Entertainment: Film">Entertainment: Film</option>
        <option value="Entertainment: Music">Entertainment: Music</option>
      </select>
      <select name="Difficulty" id="difficulty" onChange={handleDifficulty}>
        <option value="placeholder-for-difficulty">Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <input type="submit" value="Create A Game" />
    </form>
  );
};

export default CreateGame;
