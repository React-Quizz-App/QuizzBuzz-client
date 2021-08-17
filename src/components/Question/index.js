import React from 'react';
// Making Questions page component to be rendered on game page
const Question = ({ handleAnswer, data: { question, correct_answer, incorrect_answers } }) => {
  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);
  console.log(incorrect_answers);
  // const Button = ({ answer }) => <button>{answer}</button>;
  return (
    <div>
      <div>
        <h2>{question}</h2>
      </div>
      <div>
        {shuffledAnswers.map((answer) => (
          <button
            // className={`${correct_answer === answer ? (style = 'background-color: green') : 'background-color: red'}`}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
