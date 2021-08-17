import React from "react";
// Making Questions page component to be rendered on game page
const Question = () => (
  <div>
    <div>
      <h2>Here is where the question will go</h2>
    </div>
    <div>
      <button>{gameQuestions[0].correct_answer}</button>
      <button>Answer2</button>
      <button>Answer3</button>
      <button>Answer4</button>
    </div>
  </div>
);
