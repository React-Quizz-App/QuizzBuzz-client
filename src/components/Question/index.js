import React from "react";
// Making Questions page component to be rendered on game page
const Button = ({ answer }) => <button>{answer}</button>;
const Question = ({
  data: { question, correct_answer, incorrect_answers },
}) => {
  return (
    <div>
      <div>
        <h2>{question}</h2>
      </div>
      <div>
        <Button answer={correct_answer} />
        <Button answer={incorrect_answers[0]} />
        <Button answer={incorrect_answers[1]} />
        <Button answer={incorrect_answers[2]} />
      </div>
    </div>
  );
};

export default Question;
