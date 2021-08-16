import React, { useState } from 'react';
import { CreateGame } from '../../components';

const Landing = () => {
  const [isFormShown, setIsFormShown] = useState(false);
  const toggleForm = () => setIsFormShown((prev) => !prev);
  return (
    <div>
      <button>Highscores</button>
      <div>
        <h2>QuizzBuzz</h2>
      </div>
      <button onClick={toggleForm}>Create Game</button>
      <button>Join Game</button>
      {isFormShown && <CreateGame />}
    </div>
  );
};

export default Landing;
