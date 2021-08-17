import React from "react";
// Making Questions page component to be rendered on game page
const Question = ({
  data: { question, correct_answer, incorrect_answers },
}) => {
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
