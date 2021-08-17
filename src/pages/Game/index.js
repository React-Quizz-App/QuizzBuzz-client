import React, { useEffect, useState } from 'react';
import { Question } from '../../components';
import { useSelector } from 'react-redux';

//To do:
// - Build question page in JSX [ x ]
// - Take JSX and set new component []
// - Shuffle answers in array
// - Create onClick handling of answer - WITHOUT MAKING ANSWER CLEAR
// - Have a set timeout which prompts next question, tells us if answer is correct and disables user from clicking a new button
// - Note: Easier way to do this would be to not alert user of whether they answered correctly during the game

const Game = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const questionNumber = useSelector(state => state.gameState.questionNumber);

  const gameQuestions = useSelector(state => state.gameState.questions);
//   const gameQuestions = [
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "This field is sometimes known as &ldquo;The Dismal Science.&rdquo;",
//         "correct_answer": "Economics",
//         "incorrect_answers": [
//             "Philosophy",
//             "Politics",
//             "Physics"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "What is the defining characteristic of someone who is described as hirsute?",
//         "correct_answer": "Hairy",
//         "incorrect_answers": [
//             "Rude",
//             "Funny",
//             "Tall"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "Rolex is a company that specializes in what type of product?",
//         "correct_answer": "Watches",
//         "incorrect_answers": [
//             "Cars",
//             "Computers",
//             "Sports equipment"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "Which essential condiment is also known as Japanese horseradish?",
//         "correct_answer": "Wasabi ",
//         "incorrect_answers": [
//             "Mentsuyu",
//             "Karashi",
//             "Ponzu"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "Which of the following Ivy League universities has its official motto in Hebrew as well as in Latin?",
//         "correct_answer": "Yale University",
//         "incorrect_answers": [
//             "Princeton University",
//             "Harvard University",
//             "Columbia University"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "What alcoholic drink is mainly made from juniper berries?",
//         "correct_answer": "Gin",
//         "incorrect_answers": [
//             "Vodka",
//             "Rum",
//             "Tequila"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "What is the name of the popular animatronic singing fish prop, singing such hits such as &quot;Don&#039;t Worry, Be Happy&quot;?",
//         "correct_answer": "Big Mouth Billy Bass",
//         "incorrect_answers": [
//             "Big Billy Bass",
//             "Singing Fish",
//             "Sardeen"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "When did the website &quot;Facebook&quot; launch?",
//         "correct_answer": "2004",
//         "incorrect_answers": [
//             "2005",
//             "2003",
//             "2006"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "What was the original name of the search engine &quot;Google&quot;?",
//         "correct_answer": "BackRub",
//         "incorrect_answers": [
//             "CatMassage",
//             "SearchPro",
//             "Netscape Navigator"
//         ]
//     },
//     {
//         "category": "General Knowledge",
//         "type": "multiple",
//         "difficulty": "medium",
//         "question": "What was the name given to Japanese military dictators who ruled the country through the 12th and 19th Century?",
//         "correct_answer": "Shogun",
//         "incorrect_answers": [
//             "Ninja",
//             "Samurai",
//             "Shinobi"
//         ]
//     }
// ]

  // const handleAnswer = (event, answer) => {
  //   event.preventDefault();
  //   console.log(answer);
  //   const newIndex = currentIndex + 1;
  //   setCurrentIndex(newIndex);

  //   if (answer === gameQuestions[currentIndex].correct_answer) {
  //     setScore(prevScore => prevScore + 1);
  //   }

  //   if (newIndex >= gameQuestions.length) {
  //     setGameEnded(true);
  //   }
  // };

  return gameEnded ? (
    <div>This is a replacer for scoreboard at end of game. Your score was {score}</div>
  ) : gameQuestions.length ? (
    <div>
       <Question data={gameQuestions[questionNumber-1]}  />
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Game;
