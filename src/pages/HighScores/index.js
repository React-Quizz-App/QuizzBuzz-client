import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginLeft: theme.spacing(5),
  },
}));

const HighScores = () => {
  const classes = useStyles();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [allScores, setAllScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);

  const handleCategoryFilter = (e) => setCategoryFilter(e.target.value);
  const handleDifficultyFilter = (e) => setDifficultyFilter(e.target.value);

  useEffect(async () => {
    const { data } = await axios.get('https://quizzbuzz-api.herokuapp.com/highscores');
    setAllScores(data);
  }, []);

  const categoryMap = {
    'General Knowledge': 9,
    'Entertainment: Books': 10,
    'Entertainment: Film': 11,
    'Entertainment: Music': 12,
    'Entertainment: Musicicals & Theatres': 13,
    'Entertainment: Television': 14,
    'Entertainment: Video Games': 15,
    'Entertainment: Board Games': 16,
    'Science & Nature': 17,
    'Science: Computers': 18,
    'Science: Mathematics': 19,
    Mythology: 20,
    Sports: 21,
    Geography: 22,
    History: 23,
    Celebrities: 26,
    Animals: 27,
    Vehicles: 28,
    'Entertainment: Comics': 29,
    'Entertainment: Japanese Anime & Manga': 31,
    'Entertainment: Cartoon & Animations': 32,
  };

  const categoriesArr = Object.keys(categoryMap);
  const dropdownItems = categoriesArr.map((item) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  ));

  let scoreElements = filteredScores.map((s, i) => (
    <div key={i}>
      <p className="rank">{i + 1}</p>
      <p className="userName">{s.name}</p>
      <p className="userScore">{s.score}</p>
    </div>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let allScoresClone = [...allScores];
    let newFilteredScores = allScoresClone.filter((item) => item.category === categoryFilter && item.difficulty === difficultyFilter);
    let sortedNewFilteredScores = newFilteredScores.sort((a, b) => Number(b.score) - Number(a.score));
    setFilteredScores(sortedNewFilteredScores);
  };

  return (
    <div id="highscores">
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel>By Category</InputLabel>
            <Select value={categoryFilter} onChange={handleCategoryFilter}>
              {dropdownItems}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>By Difficulty</InputLabel>
            <Select value={difficultyFilter} onChange={handleDifficultyFilter}>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button type="submit" variant="outlined" color="default">
          Filter Results
        </Button>
      </form>
      {scoreElements}
    </div>
  );
};

export default HighScores;
