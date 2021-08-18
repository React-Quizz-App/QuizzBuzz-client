import React, { useEffect, useState } from "react";
import axios from "axios";

const HighScores = () => {
  const [highscores, setHighscores] = useState();
  const [isFilterSelected, setIsFilterSelected] = useState(false);

  const toggleHighscoreFilter = () => setIsFilterSelected((prev) => !prev);

  useEffect(() => {
    async function fetchHighScores() {
      try {
        let { data } = await axios.get("http://localhost:3000/highscores");
        setHighscores(data);
      } catch (err) {
        console.warn(err);
      }
    }
    fetchHighScores();
  }, []);

  const sortHighscores = () => {
    if (highscores) {
      const rankedHighscores = highscores.sort(
        (a, b) => Number(b.score) - Number(a.score)
      );
      console.log(rankedHighscores);
      const arr = rankedHighscores.map((sortedScore, index) => {
        let rank = index + 1;
        let id = sortedScore._id;
        let username = sortedScore.name;
        let score = sortedScore.score;
        console.log(rank, id, username, score);
        return { rank, id, username, score };
      });
      return arr;
    }
  };

  let saveSortedHighScores = highscores ? sortHighscores() : [];
  console.log(saveSortedHighScores);
  let renderHighscores = saveSortedHighScores.map((s, i) => (
    <div key={i}>
      <p>{s.rank}</p>
      <p>{s.username}</p>
      <p>{s.score}</p>
    </div>
  ));

  return (
    <div>
      <h2>HighScores</h2>
      {highscores ? renderHighscores : ""}
      <button onClick={toggleHighscoreFilter}>Filter</button>
      {/* {isFilterSelected && newComponent} */}
    </div>
  );
};

export default HighScores;
