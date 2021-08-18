import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HighScores } from '../../pages';
import { CreateGame, JoinGame } from '../../components';

const Landing = () => {
  const [isFormShown, setIsFormShown] = useState(false);
  const [isJoinFormShown, setIsJoinFormShown] = useState(false);
  const [isHighscoresShown, setIsHighscoresShown] = useState(false); //this is an intermediate solution, should use NavLink

  const toggleForm = () => setIsFormShown((prev) => !prev);
  const toggleJoinForm = () => setIsJoinFormShown((prev) => !prev);
  const toggleHighscores = () => setIsHighscoresShown((prev) => !prev);
  return (
    <div>
      <button onClick={toggleHighscores}>Highscores</button>
      <div>
        <h2>QuizzBuzz</h2>
      </div>
      <button onClick={toggleForm}>Create Game</button>
      <button onClick={toggleJoinForm}>Join Game</button>
      {isHighscoresShown && <HighScores />}
      {isFormShown && <CreateGame />}
      {isJoinFormShown && <JoinGame />}
    </div>
  );
};

export default Landing;
