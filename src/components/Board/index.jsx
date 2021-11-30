import React, { useEffect, useState } from "react";
import { Cell } from "..";
import { initBoard, randomEntry, swipeHorizontalMerge, swipeVerticalMerge } from "../../helpers";
import './index.css';

const Board = ({ pressedKey, triggerRestart }) => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => setGameState(randomEntry(randomEntry(initBoard()))), [triggerRestart]);

  const updateGameState = newState => {
    if(newState === null) {
      return newState;
    } else {
      return randomEntry(newState);
    }
  }

  useEffect(() => {
    switch(pressedKey) {
      case '1':
      case 'ArrowLeft':
        setGameState(prevState => {
          let newState = swipeHorizontalMerge(prevState, -1);
          let newUpdatedState = updateGameState(newState);
          return newUpdatedState !== null ? newUpdatedState : prevState;
        });
        break;
      case '2':
      case 'ArrowRight':
        setGameState(prevState => {
          let newState = swipeHorizontalMerge(prevState, 1);
          let newUpdatedState = updateGameState(newState);
          return newUpdatedState !== null ? newUpdatedState : prevState;
        });
        break;
      case '3':
      case 'ArrowUp':
        setGameState(prevState => {
          let newState = swipeVerticalMerge(prevState, -1);
          let newUpdatedState = updateGameState(newState);
          return newUpdatedState !== null ? newUpdatedState : prevState;
        });
        break;
      case '4':
      case 'ArrowDown':
        setGameState(prevState => {
          let newState = swipeVerticalMerge(prevState, 1);
          let newUpdatedState = updateGameState(newState);
          return newUpdatedState !== null ? newUpdatedState : prevState;
        });
        break;
      default:
    }
  }, [pressedKey]);

  const cells = gameState !== null &&
    Array(4).fill(0).map((_, i) =>
      <div className='Row' key={i}>
        {
          Array(4).fill(0).map((_, j) =>
            <Cell key={i.toString() + j.toString()} value={gameState[i][j]} />
          )
        }
      </div>
    );

  return (
    <div className='Board'>
      {cells}
    </div>
  );
}

export default Board;