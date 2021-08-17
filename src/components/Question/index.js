import React, { useState, useEffect } from 'react';
import { incrementQuestionNumber, updateScore } from '../../actions';
import { useDispatch } from 'react-redux';


const Question = ({ handleAnswer, data: { question, correct_answer, incorrect_answers } }) => {

  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
    setShuffledAnswers([correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5))
  }, [question])

  function handleChange(event){
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(selectedOption);
    // increment question number by one
    dispatch(incrementQuestionNumber())
    // if score is correct update the score
    if (selectedOption === correct_answer){
      dispatch(updateScore());
    };
  }
  return (
    <div>
      <div>
        <h2>{question}</h2>
      </div>
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
