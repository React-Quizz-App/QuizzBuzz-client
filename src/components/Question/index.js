import React from "react";
// Making Questions page component to be rendered on game page
const Question = () => (
  <div>
    <div>
      <h2>{gameQuestions[0]}</h2>
    </div>
    <div>
      <button>{gameQuestions[0].correct_answer}</button>
      <button>{gameQuestions[0].incorrect_answer[0]}</button>
      <button>{gameQuestions[0].incorrect_answer[1]}</button>
      <button>{gameQuestions[0].incorrect_answer[2]}</button>
    </div>
  </div>
);
