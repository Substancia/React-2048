import React from "react";
import './index.css';

const Cell = ({ value }) => {
  return (
    <div className='Cell'>
      {
        value !== null && value
      }
    </div>
  );
}

export default Cell;