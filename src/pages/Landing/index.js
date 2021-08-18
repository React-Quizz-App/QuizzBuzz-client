import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HighScores } from "../../pages";
import { CreateGame, JoinGame } from "../../components";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const Landing = () => {
  function createCircle() {
    // const colors = ['#d4d1ff', '#9b99bd', '#6c6a7e', '#d1a2a2'];
    const colors = ["rgb(250, 143, 3, 0.8)"];
    const bg = colors[Math.floor(Math.random() * colors.length)];
    const section = document.querySelector(".landing-page");
    const circle = document.createElement("span");
    const size = Math.floor(Math.random() * 50) + 20;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.position = "absolute";
    circle.style.bottom = Math.random() * innerHeight + "px";
    circle.style.right = Math.random() * innerWidth + "px";
    circle.style.borderRadius = "100%";
    circle.style.background = bg;
    circle.style.zIndex = "1";
    section.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 5000);
  }

  // setInterval(createCircle, 150)

  const [isFormShown, setIsFormShown] = useState(false);
  const [isJoinFormShown, setIsJoinFormShown] = useState(false);
  const [isHighscoresShown, setIsHighscoresShown] = useState(false); //this is an intermediate solution, should use NavLink

  const toggleForm = () => setIsFormShown((prev) => !prev);
  const toggleJoinForm = () => setIsJoinFormShown((prev) => !prev);
  const toggleHighscores = () => setIsHighscoresShown((prev) => !prev);
  return (
    <div class="landing-page">
      <div className="outer-container">
        <div className="inner-container">
          <button
            onClick={toggleHighscores}
            id="high-score-btn"
            className="btn"
          >
            Highscores
          </button>
          <div className="landing-container">
            <div className="start-form-section">
              <button onClick={toggleForm} className="btn">
                Create Game
              </button>
              <button onClick={toggleJoinForm} className="btn">
                Join Game
              </button>
            </div>
            {isHighscoresShown && <HighScores />}{" "}
            {/* should redirect to another page */}
            <div className="form-section">
              {isFormShown && <CreateGame />}
              {isJoinFormShown && <JoinGame />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
