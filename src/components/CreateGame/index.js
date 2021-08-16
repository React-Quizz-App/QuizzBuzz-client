import React, { useState } from 'react';

const CreateGame = () => {
  //States
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numOfPlayers, setNumOfPlayers] = useState('1');

  //Username handling
  const handleUserName = (e) => setUserName(e.target.value);

  //Category handling
  const handleCategory = (e) => setCategory(e.target.value);

  //Difficulty handling
  const handleDifficulty = (e) => setDifficulty(e.target.value);

  //Player number handling
  const handleNoOfPlayers = (e) => setNumOfPlayers(e.target.value);

  //Form submission handling
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // updateCity(cityInput);  a function coming from props
    setUserName('');
    setCategory('');
    setDifficulty('');
    setNumOfPlayers('1');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* <label htmlFor="username">Enter username</label> */}
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
      <select name="Category" id="category">
        <option value="placeholder">Category</option>
        <option value="General Knowledge" onClick={handleCategory}>
          General Knowledge
        </option>
        <option value="Entertainment: Books" onClick={handleCategory}>
          Entertainment: Books
        </option>
        <option value="Entertainment: Film" onClick={handleCategory}>
          Entertainment: Film
        </option>
        <option value="Entertainment: Music" onClick={handleCategory}>
          Entertainment: Music
        </option>
      </select>
      <select name="Difficulty" id="difficulty">
        <option value="placeholder-for-difficulty">Difficulty</option>
        <option value="Easy" onClick={handleDifficulty}>
          Easy
        </option>
        <option value="Medium" onClick={handleDifficulty}>
          Medium
        </option>
        <option value="Hard" onClick={handleDifficulty}>
          Hard
        </option>
      </select>
      <input type="submit" value="Create A Game" />
    </form>
  );
};

export default CreateGame;
