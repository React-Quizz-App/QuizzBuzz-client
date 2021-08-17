import React from 'react';
// Making Questions page component to be rendered on game page
const Question = ({ handleAnswer, data: { question, correct_answer, incorrect_answers } }) => {
  const shuffledAnswer = [correct_answers, ...incorrect_answers].sort(() => Math.random() - 0.5);
  console.log(incorrect_answers);
  return (
    <div>
      <div>
        <h2>{question}</h2>
      </div>
      <div>
        <button>{correct_answer}</button>
        <button>{incorrect_answers[0]}</button>
        <button>{incorrect_answers[1]}</button>
        <button>{incorrect_answers[2]}</button>
      </div>
    </div>
  );
};

export default Question;
