import React, { useEffect, useState } from "react";
import { Cell } from "..";
import { initBoard, randomEntry, swipeHorizontalMerge } from "../../helpers";
import { useKeyPressDetectHook } from '../../customHooks';
import './index.css';

const Board = () => {
  const [gameState, setGameState] = useState(null);
  const pressedKey = useKeyPressDetectHook();

  useEffect(() => setGameState(randomEntry(randomEntry(initBoard()))), []);

  useEffect(() => {
    switch(pressedKey) {
      case '1':
        setGameState(prevState => swipeHorizontalMerge(prevState, -1));
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