import React from "react";
// Making Questions page component to be rendered on game page
const Question = ({
  handleAnswer,
  data: { question, correct_answer, incorrect_answers },
}) => {
  const shuffledAnswer = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
  );
  console.log(incorrect_answers);
  const Button = ({ answer }) => <button>{answer}</button>;
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
