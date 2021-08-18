import React, { useState, useEffect } from 'react';
import { incrementQuestionNumber, updateScore } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import he from 'he';
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';


const Question = ({ data: { question, correct_answer, incorrect_answers } }) => {

  const [counter, setCounter] = useState(30);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.gameState);
  const socket = useSelector(state => state.socket);
  const clientUser = useSelector(state => state.user);

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
    };
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


  return (
    <>
    <div>
      <div>
        <h2>{he.decode(question)}</h2>
      </div>
      <p>{counter}</p>
      <div>
        <form onSubmit={handleSubmit}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Select an answer:</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={selectedOption} onChange={handleChange} >
            {answerElements}
          </RadioGroup>
          <Button type="submit" variant="outlined" color="primary">Submit</Button>
        </FormControl>
        </form>
      </div>
    </div>
    { isGameOver && <Redirect to='/game-over' />}
    </>
  );
};

export default Question;
