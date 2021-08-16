import React, { useState } from "react";
import { CreateGame, JoinGame } from "../../components";

const Landing = ({socket}) => {
  const [isFormShown, setIsFormShown] = useState(false);
  const [isJoinFormShown, setIsJoinFormShown] = useState(false);

  const toggleForm = () => setIsFormShown((prev) => !prev);
  const toggleJoinForm = () => setIsJoinFormShown((prev) => !prev);
  return (
    <div>
      <button>Highscores</button>
      <div>
        <h2>QuizzBuzz</h2>
      </div>
      <button onClick={toggleForm}>Create Game</button>
      <button onClick={toggleJoinForm}>Join Game</button>
      {isFormShown && <CreateGame socket={socket}/>}
      {isJoinFormShown && <JoinGame />}
    </div>
  );
};

export default Landing;
