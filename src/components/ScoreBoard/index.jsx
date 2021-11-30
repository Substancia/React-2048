import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import './index.css';

const ScoreBoard = ({ score }) => {
  const [best, setBest] = useState(localStorage.getItem('best') || 0);

  useEffect(() => {
    if(score > best) {
      localStorage.setItem('best', score);
      setBest(score);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);
  
  return (
    <div className='ScoreBoard'>
      <h4>Score: {score}</h4>
      <h4>Best: {best}</h4>
    </div>
  );
}

export default ScoreBoard;