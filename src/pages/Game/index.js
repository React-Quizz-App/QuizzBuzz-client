import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Game = () => {
  const [gameQuestions, setGameQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuizzQuestions() {
      try {
        let { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`);
        let { results } = data;
        setGameQuestions(results);
        // console.log(gameQuestions[0].category);
        // console.log(data);
      } catch (err) {
        console.warn(err);
      }
    }
    fetchQuizzQuestions();
  }, []);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      // setPressed(true);
      let counter = 0;
      const Ques = gameQuestions[counter].question;

      const timer = setInterval(4500);
      counter++;
      console.log(Ques);
      return () => clearInterval(timer);
    }
  }, [gameQuestions]);
  //   gameQuestions.length

  return (
    <>
      <p>{gameQuestions.length ? gameQuestions[0].category : ''}</p>
    </>
  );
};

export default Game;
