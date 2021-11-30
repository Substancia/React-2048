import React from "react";
import './index.css';

const Cell = ({ value }) => {
  const order = Math.log2(value) - 1;

  return (
    <div className='Cell'
      style={{ backgroundColor: value !== null ?
          `hsl(51, 100%, ${80 - 30 * (order / 15)}%)` :
          'coral'
      }}
    >
      {
        value !== null && value
      }
    </div>
  );
}

export default Cell;