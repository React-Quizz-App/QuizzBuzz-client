
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeUser } from '../../actions';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateGame = () => {

  const classes = useStyles();
  //States
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);

  function codeGenerator() {
    const chars = "acdefhiklmnoqrstuvwxyz0123456789".split("");
    let result = "";
    for (let i = 0; i < 6; i++) {
      const x = Math.floor(Math.random() * chars.length);
      result += chars[x];
    }
    return result;
  }

  async function getQuestions(cat, diff) {
    const categoryMap = {
      "General Knowledge": 9,
      "Entertainment: Books": 10,
      "Entertainment: Film": 11,
      "Entertainment: Music": 12,
      "Science: Computers": 18,
      Sports: 21,
    };
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryMap[cat]}&difficulty=${diff}&type=multiple`;
    const { data } = await axios.get(url);
    return data.results;
  }

  //Username handling
  const handleUserName = (e) => setUserName(e.target.value);

  //Category handling
  const handleCategory = (e) => setCategory(e.target.value);

  //Difficulty handling
  const handleDifficulty = (e) => setDifficulty(e.target.value);

  //Form submission handling
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let roomName = codeGenerator();
    // axios request to get questions
    const questions = await getQuestions(category, difficulty);
    socket.emit("create game", {
      room: roomName,
      category,
      difficulty,
      host: userName,
      questions,
    });
    setGameCode(roomName);
    dispatch(storeUser(userName));
    setUserName("");
    setCategory("");
    setDifficulty("");
    setIsFormSubmitted(true);
  };

  return (
    <>
    <form onSubmit={handleFormSubmit}>
      {/* <input
        type="text"
        id="username"
        name="userName"
        placeholder="Enter your chosen username"
        onMouseOver={(e) => (e.target.placeholder = '')}
        onMouseOut={(e) => (e.target.placeholder = 'Enter your chosen username')}
        value={userName}
        required
        onChange={handleUserName}
      /> */}
      <div className='create-input'>
      <TextField label='Username' onChange={handleUserName} value={userName}/>
      </div>
      <div className='create-input'>
        <FormControl className={classes.formControl}>
          <InputLabel >Category</InputLabel>
          <Select value={category} onChange={handleCategory}>
            <MenuItem value="placeholder">Category</MenuItem>
            <MenuItem value="General Knowledge">General Knowledge</MenuItem>
            <MenuItem value="Entertainment: Books">Entertainment: Books</MenuItem>
            <MenuItem value="Entertainment: Film">Entertainment: Film</MenuItem>
            <MenuItem value="Entertainment: Music">Entertainment: Music</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Science: Computers">Science: Computers</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* <select name="Category" id="category" onChange={handleCategory} required>
        <option value="placeholder">Category</option>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Entertainment: Books">Entertainment: Books</option>
        <option value="Entertainment: Film">Entertainment: Film</option>
        <option value="Entertainment: Music">Entertainment: Music</option>
        <option value="Sports">Sports</option>
        <option value="Science: Computers">Science: Computers</option>
      </select>
      <select name="Difficulty" id="difficulty" onChange={handleDifficulty} required>
        <option value="placeholder-for-difficulty">Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select> */}
      <div className='create-input'>
      <Button type="submit" variant="outlined" color="primary">Submit</Button>
      </div>
      {/* <input type="submit" value="Create A Game" /> */}
    </form>
    {isFormSubmitted && <Redirect to='/waiting-room'/>}
    </>
  );
};

export default CreateGame;
