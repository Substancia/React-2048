const initBoard = () => {
  let gameState = [];
  for(let row = 0; row < 4; ++row) {
    gameState.push(Array(4).fill(null));
  }
  return gameState;
}

const randomEntry = gameState => {
  var i, j;
  do {
    i = Math.floor(Math.random() * 4);
    j = Math.floor(Math.random() * 4);
  } while(gameState[i][j] !== null);

  gameState[i][j] = 2 * (1 + Math.floor(Math.random() * 2));
  return gameState;
}

const swipeHorizontalMerge = (gameState, direction) => {
  let start, end = direction < 0 ? [1, 3] : [2, 0];

  for(let row = 0; row < 4; ++ row) {
    if(gameState[row].every(v => v === null)) continue;
    let updated = true;
    while(updated) {
      for(let cell = start; cell * direction * (-1) <= end; cell -= direction) {
        if(gameState[row][cell] === null) continue;
        switch(gameState[row][cell + direction]) {
          case null:
            gameState[row][cell + direction] = gameState[row][cell];
            gameState[row][cell] = null;
            break;
          case gameState[row][cell]:
            gameState[row][cell + direction] = 2 * gameState[row][cell];
            gameState[row][cell] = null
            break;
          default:
            updated = false;
        }
      }
      console.log(gameState);
    }
  }

  return gameState;
}

export { initBoard, randomEntry, swipeHorizontalMerge }