import React from 'react';
import { Question } from '../../components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './style.css'

const Game = () => {
  const questionNumber = useSelector(state => state.gameState.questionNumber);
  const gameQuestions = useSelector(state => state.gameState.questions);
  const gameUsers = useSelector(state => state.gameState.users);
  const gameState = useSelector(state => state.gameState);
  const socket = useSelector(state => state.socket);
  const clientUser = useSelector(state => state.user);

//  const gameState =  {
//     "roomName": "rs6z3n",
//     "category": "Entertainment: Books",
//     "difficulty": "easy",
//     "host": "d",
//     "users": [
//         {"name": "No Tom","score": 0}, {"name": "Jawwad","score": 5},{"name": "Rafika","score": 9},{"name": "Akash","score": 9}
//     ],
//     "questionNumber": 1,
//     "questions": [
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "Which famous book is sub-titled &#039;The Modern Prometheus&#039;?",
//             "correct_answer": "Frankenstein",
//             "incorrect_answers": [
//                 "Dracula",
//                 "The Strange Case of Dr. Jekyll and Mr. Hyde ",
//                 "The Legend of Sleepy Hollow"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "Which of the following is the world&#039;s best-selling book?",
//             "correct_answer": "The Lord of the Rings",
//             "incorrect_answers": [
//                 "The Little Prince",
//                 "Harry Potter and the Philosopher&#039;s Stone",
//                 "The Da Vinci Code"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "&quot;Green Eggs And Ham&quot; is a book by which author?",
//             "correct_answer": "Dr. Seuss",
//             "incorrect_answers": [
//                 "Beatrix Potter",
//                 "Roald Dahl",
//                 "A.A. Milne"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "Which famous spy novelist wrote the childrens&#039; story &quot;Chitty-Chitty-Bang-Bang&quot;?",
//             "correct_answer": "Ian Fleming",
//             "incorrect_answers": [
//                 "Joseph Conrad",
//                 "John Buchan",
//                 "Graham Greene"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "How many Harry Potter books are there?",
//             "correct_answer": "7",
//             "incorrect_answers": [
//                 "8",
//                 "5",
//                 "6"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "Under what pseudonym did Stephen King publish five novels between 1977 and 1984?",
//             "correct_answer": "Richard Bachman",
//             "incorrect_answers": [
//                 "J. D. Robb",
//                 "Mark Twain",
//                 "Lewis Carroll"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "What&#039;s Harry Potter&#039;s dad&#039;s name?",
//             "correct_answer": "James Potter",
//             "incorrect_answers": [
//                 "Joey Potter",
//                 "Frank Potter",
//                 "Hairy Potter Sr."
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "What is the name of the protagonist of J.D. Salinger&#039;s novel Catcher in the Rye?",
//             "correct_answer": "Holden Caulfield",
//             "incorrect_answers": [
//                 "Fletcher Christian",
//                 "Jay Gatsby",
//                 "Randall Flagg"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "What&#039;s the second book in George R. R. Martin&#039;s &#039;A Song of Ice and Fire&#039; series?",
//             "correct_answer": "A Clash of Kings",
//             "incorrect_answers": [
//                 "A Dance with Dragons",
//                 "A Storm of Swords",
//                 "A Feast for Crows"
//             ]
//         },
//         {
//             "category": "Entertainment: Books",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "In the novel 1984, written by George Orwell, what is the name of the totalitarian regime that controls Oceania?",
//             "correct_answer": "INGSOC",
//             "incorrect_answers": [
//                 "Neo-Bolshevism",
//                 "Obliteration of the Self",
//                 "Earth Alliance"
//             ]
//         }
//     ],
//     "isGameStarted": true
// }

//   const questionNumber = gameState.questionNumber;
//   console.log(questionNumber)
//   const gameQuestions = gameState.questions;
//   const gameUsers = gameState.users;
//   const socket = socket;
//   const clientUser = "user";

  const userElements = gameUsers.map(user => <div key={user.name} class="in-game-user-score">
    <h2>{user.name}</h2>
    <h3>{user.score}</h3>
  </div>)

  if (questionNumber > 10){
    socket.emit('complete quiz', {room: gameState.roomName, user: clientUser})
  }
  
  return (
    <>
    <div className="game-page">
      <div className="outer-container">
        <div className="inner-container">
          {questionNumber <= 10 &&
          <div className="question-section">
             <Question data={gameQuestions[questionNumber-1]}  />
             <div className="in-game-scoreboard">{userElements}</div>
          </div>
          }
          {questionNumber > 10 && <Redirect to='game-over'/>}
        </div>
      </div>
    </div>
    </>
  )
};

export default Game;
