import React, { useState, useEffect } from 'react';
import { incrementQuestionNumber, updateScore } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';


const Question = ({ data: { question, correct_answer, incorrect_answers } }) => {

  const [counter, setCounter] = useState(10);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
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
        setCounter(10);
      } else {
        console.log('game over');
      }
    };
  }, [counter])

  function handleChange(event){
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(selectedOption);
    // increment question number by one
    if (gameState.questionNumber !== 10){
      dispatch(incrementQuestionNumber());
      setCounter(10);
    } else {
      console.log('game over');
    }
    // if score is correct update the score
    if (selectedOption === correct_answer && gameState.questionNumber <= 10){
      dispatch(updateScore());
      // let newState = {...gameState};
      // let newUsers = [...gameState.users];
      // let userIdx = newUsers.findIndex(item => item.name === clientUser);
      // console.log(userIdx);
      // newUsers[userIdx].score += 1;
      // newState.users = newUsers;
      // console.log(newState);
      // socket.emit('send state to players', newState);
    };

  }
  return (
    <div>
      <div>
        <h2>{question}</h2>
      </div>
      <p>{counter}</p>
      <div>
        <form onSubmit={handleSubmit}>
        {shuffledAnswers.map((answer) => (
          <div key = {answer}>
          <input onChange = {handleChange} type="radio" id={answer} name="answer" value={answer} checked={selectedOption === answer}/>
          <label htmlFor={answer}>{answer}</label>
          </div>
        ))}
        <input type='submit' value='Submit'></input>
        </form>
      </div>
    </div>
  );
};

export default Question;
