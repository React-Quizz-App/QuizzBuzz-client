import React from "react";
// Making Questions page component to be rendered on game page
const Question = ({
  results: { question, correct_answer, incorrect_answer },
}) => (
  <div>
    <div>
      <h2>{question}</h2>
    </div>
    <div>
      <button>{correct_answer}</button>
      <button>{incorrect_answer[0]}</button>
      <button>{incorrect_answer[1]}</button>
      <button>{incorrect_answer[2]}</button>
    </div>
  </div>
);

export default Question;
