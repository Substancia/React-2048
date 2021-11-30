import React from "react";
import { useState } from "react/cjs/react.development";
import { Board } from "../../components";
import { useKeyPressDetectHook } from "../../customHooks";
import './index.css';

const GameScreen = () => {
  const pressedKey = useKeyPressDetectHook();
  const [triggerRestart, setTriggerRestart] = useState(0);

  return (
    <div className='GameScreen'>
      <div className='Board-ctrl'>
        <Board pressedKey={pressedKey} triggerRestart={triggerRestart} />
        <button onClick={() => setTriggerRestart(Math.random())}>Restart</button>
      </div>

      <div className='Instructions'>
        <p>
          Press:-
          <ul>
            <li>1 or left arrow key to swipe left</li>
            <li>2 or right arrow key to swipe right</li>
            <li>3 or up arrow key to swipe up</li>
            <li>4 or down arrow key to swipe down</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default GameScreen;