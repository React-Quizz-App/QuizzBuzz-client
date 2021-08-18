import React from 'react';

const FilterHighScores = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const handleCategoryFilter = (e) => setCategoryFilter(e.target.value);
  const handleDifficultyFilter = (e) => setDifficultyFilter(e.target.value);
  return (
    <div>
      <form>
        <select name="Category" id="category-filter" onChange={handleCategoryFilter} required>
          <option value="placeholder">By Category</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Entertainment: Books">Entertainment: Books</option>
          <option value="Entertainment: Film">Entertainment: Film</option>
          <option value="Entertainment: Music">Entertainment: Music</option>
          <option value="Sports">Sports</option>
          <option value="Science: Computers">Science: Computers</option>
        </select>
        <select name="Difficulty" id="difficulty-filter" onChange={handleDifficultyFilter} required>
          <option value="placeholder-for-difficulty">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </form>
    </div>
  );
};

export default FilterHighScores;
