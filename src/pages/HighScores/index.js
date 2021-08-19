import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { render } from 'react-dom';

const HighScores = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [filteredHighScores, setFilteredHighScores] = useState([]);
  const [isFilterSelected, setIsFilterSelected] = useState(false);

  const handleCategoryFilter = (e) => setCategoryFilter(e.target.value);
  const handleDifficultyFilter = (e) => setDifficultyFilter(e.target.value);
  const toggleHighscoreFilter = () => setIsFilterSelected((prev) => !prev);

  async function fetchFilteredHighScores() {
    let { data } = await axios.get(`http://localhost:3000/highscores/${categoryFilter}/${difficultyFilter}`);
    // console.log(data);
    setFilteredHighScores(data);
  }

  //   console.log(filteredHighScores);

  const sortHighscores = () => {
    if (filteredHighScores.length) {
      //   console.log(filteredHighScores);
      const arr = filteredHighScores.map((sortedScore, index) => {
        let rank = index + 1;
        let id = sortedScore._id;
        let username = sortedScore.name;
        let score = sortedScore.score;
        // console.log(rank, id, username, score);
        return { rank, id, username, score };
      });
      return arr;
    }
  };

  let saveSortedHighScores = filteredHighScores.length ? sortHighscores() : [];
  //   console.log(saveSortedHighScores);

  let renderHighscores = saveSortedHighScores.map((s, i) => (
    <div key={i}>
      <p className="rank">{s.rank}</p>
      <p className="userName">{s.username}</p>
      <p className="userScore">{s.score}</p>
      <button onClick={toggleHighscoreFilter}>Reset</button>
    </div>
  ));

  //   console.log(categoryFilter, difficultyFilter);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(rafCode);
    if (isFilterSelected) {
      alert('Please reset form');
    } else {
      let rafCode = await fetchFilteredHighScores();
      toggleHighscoreFilter();
    }
    e.target.reset();
    setCategoryFilter('');
    setDifficultyFilter('');
  };

  //   console.log(isFilterSelected);

  return (
    <div id="highscores">
      <form onSubmit={handleSubmit}>
        <select name="Category" id="category-filter" onChange={handleCategoryFilter} required>
          {/* <option value="placeholder">By Category</option> */}
          <option value="starter" selected="selected">
            By Category{' '}
          </option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Entertainment: Books">Entertainment: Books</option>
          <option value="gaming">Entertainment: Film</option>
          <option value="Entertainment: Music">Entertainment: Music</option>
          <option value="sports">Sports</option>
          <option value="Science: Computers">Science: Computers</option>
        </select>
        <select name="Difficulty" id="difficulty-filter" onChange={handleDifficultyFilter} required>
          {/* <option value="placeholder-for-difficulty">By Difficulty</option> */}
          <option value="starter" selected="selected">
            By Difficulty{' '}
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input type="submit" value="Filter Results" />
      </form>
      {isFilterSelected ? renderHighscores : <p></p>}
    </div>
  );
};

export default HighScores;

//Can try to hide button if isFilterSelected is off. And also have reset button on
