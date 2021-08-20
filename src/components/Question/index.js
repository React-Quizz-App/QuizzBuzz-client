import React, { useState, useEffect, useRef } from 'react';
import { incrementQuestionNumber, updateScore } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import he from 'he';
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, Button, ThemeProvider } from '@material-ui/core';
import './style.css'


const Question = ({ data: { question, correct_answer, incorrect_answers } }) => {

  const [counter, setCounter] = useState(30);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.gameState);
  const socket = useSelector(state => state.socket);
  const clientUser = useSelector(state => state.user);
  const proRef = useRef();

  useEffect(()=>{
    setShuffledAnswers([correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5))
  }, [question])

  useEffect(() => {
    function decrementCounter(){
      setCounter(prevCount => prevCount - 1)
    }
    const stream = setInterval(()=>decrementCounter(), 1000)
    return () => clearInterval(stream)
  }, [question]);

  useEffect(()=>{
    if (counter === 0 ){
      if (gameState.questionNumber <= 10){
        dispatch(incrementQuestionNumber());
        setCounter(30);
      } else {
        console.log('game over');
        setIsGameOver(true);
      }
    }
    resetProgressBar()
    ;
  }, [counter])

  function handleChange(event){
    setSelectedOption(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    // increment question number by one
    if (gameState.questionNumber <= 10){
      dispatch(incrementQuestionNumber());
      setCounter(30);
    } else {
      console.log('game over');
      setIsGameOver(true);
    }
    // if score is correct update the score
    if (selectedOption === correct_answer && gameState.questionNumber <= 10){
      let score = 100 + (2*counter);
      dispatch(updateScore(clientUser, score));
      socket.emit('update player score', {room: gameState.roomName, user: clientUser, score})
    };
  }
  
  const answerElements = shuffledAnswers.map((answer) => (
    <FormControlLabel key={answer} value={answer} control={<Radio />} label={he.decode(answer)} />
  ));

  const resetProgressBar = () => {
    proRef.current.style.width = `${counter*10/3}%`;
    console.log(proRef.current.style.width)
  }

  return (
    <>
    <div className="individual-question-section">
      <div className="actual-question">
        <h2>{he.decode(question)}</h2>
      </div>
      <div className="progress-bar">
        <div className="time-left" ref={proRef}>
        {/* {counter} */}
        </div>
      </div>
      <div className="answer-options-section">
        <form onSubmit={handleSubmit} className="outer-form-questions">
        <FormControl component='fieldset' className="form-control">
          <div className="answer-options">
            <FormLabel component='legend'></FormLabel>
            {/* <FormLabel component='legend'>Select an answer:</FormLabel> */}
            <RadioGroup aria-label="gender" name="gender1" value={selectedOption} onChange={handleChange} >
              {answerElements}
            </RadioGroup>
          </div>
          <Button type="submit" variant="outlined" color="primary" className="question-form-btn">Submit</Button>
        </FormControl>
        </form>
      </div>
    </div>
    { isGameOver && <Redirect to='/game-over' />}
    </>
  );
};

export default Question;
