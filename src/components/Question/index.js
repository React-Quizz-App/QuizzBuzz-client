import React, { useState, useEffect } from 'react';
import { incrementQuestionNumber, updateScore } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import he from 'he';


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
    if (gameState.questionNumber !== 10){
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
  return (
    <>
    <div>
      <div>
        <h2>{he.decode(question)}</h2>
      </div>
      <p>{counter}</p>
      <div>
        <form onSubmit={handleSubmit}>
        {shuffledAnswers.map((answer) => (
          <div key = {answer}>
          <input onChange = {handleChange} type="radio" id={answer} name="answer" value={answer} checked={selectedOption === answer}/>
          <label htmlFor={answer}>{he.decode(answer)}</label>
          </div>
        ))}
        <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
    { isGameOver && <Redirect to='/game-over' />}
    </>
  );
};

export default Question;
