import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { HighScores } from '../../pages';
import { CreateGame, JoinGame } from '../../components';
import { Modal } from '@material-ui/core';
import './style.css';


const Landing = () => {

  const circleRef = useRef();
  // function createCircle() {
  //   if(circleRef.current === undefined) return
  //   const colors = ["rgb(250, 143, 3, 0.8)"];
  //   const bg = colors[Math.floor(Math.random() * colors.length)];
  //   const section = circleRef.current;
  //   // console.log(section)
  //   const circle = document.createElement("span");
  //   // console.log(circle)
  //   const size = Math.floor(Math.random() * 50) + 20;
  //   circle.style.width = `${size}px`;
  //   circle.style.height = `${size}px`;
  //   circle.style.position = "absolute";
  //   circle.style.bottom = Math.random() * innerHeight + "px";
  //   circle.style.right = Math.random() * innerWidth + "px";
  //   circle.style.borderRadius = "100%";
  //   circle.style.background = bg;
  //   circle.style.zIndex = "1";
  //   section.appendChild(circle);
  //   setTimeout(() => {
  //     circle.remove();
  //   }, 5000);
  // }
  useEffect(()=> {
    function createCircle() {
      if(circleRef.current === undefined) return
      const colors = ["rgb(250, 143, 3, 0.8)"];
      const bg = colors[Math.floor(Math.random() * colors.length)];
      const section = circleRef.current;
      // console.log(section)
      const circle = document.createElement("span");
      // console.log(circle)
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
    const stream = setInterval(createCircle, 500);
    return () => clearInterval(stream); 
  }, []);
  

  const [isFormShown, setIsFormShown] = useState(false);
  const [isJoinFormShown, setIsJoinFormShown] = useState(false);
  const [isHighscoresShown, setIsHighscoresShown] = useState(false); //this is an intermediate solution, should use NavLink
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  // const toggleForm = () => setIsFormShown((prev) => !prev);
  // const toggleJoinForm = () => setIsJoinFormShown((prev) => !prev);
  const toggleHighscores = () => setIsHighscoresShown((prev) => !prev);
  function handleCreateOpen(){
    setCreateOpen(true);
  }

  function handleCreateClose(){
    setCreateOpen(false);
  }

  function handleJoinOpen(){
    setJoinOpen(true);
  }

  function handleJoinClose(){
    setJoinOpen(false);
  }


  return (
    <div ref={circleRef} className="landing-page">
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
              <button onClick={handleCreateOpen} className="btn">Create Game</button>
              <button onClick={handleJoinOpen} className="btn">Join Game</button>
            </div>
            {isHighscoresShown && <HighScores />}   {/* should redirect to another page */}
            <Modal open={createOpen} onClose={handleCreateClose}>
              <div className='create-modal-container'>
                <CreateGame />
              </div>
            </Modal>

            <Modal open={joinOpen} onClose={handleJoinClose}>
              <div className='create-modal-container'>
                <JoinGame />
              </div>
            </Modal>

            {/* <div className="form-section">

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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
