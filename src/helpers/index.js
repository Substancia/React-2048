const initBoard = () => {
  let gameState = [];
  for(let row = 0; row < 4; ++row) {
    gameState.push([null, null, null, null]);
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
  let [start, end] = direction < 0 ? [1, 3] : [2, 0];
  let stateChanged = false;
  let addScore = 0;

  for(let row = 0; row < 4; ++ row) {
    if(gameState[row].every(v => v === null)) continue;
    let updated = true;
    while(updated) {
      updated = false;
      for(let cell = start; cell * direction * (-1) <= end; cell -= direction) {
        if(gameState[row][cell] === null) continue;
        switch(gameState[row][cell + direction]) {
          case null:
            gameState[row][cell + direction] = gameState[row][cell];
            gameState[row][cell] = null;
            updated = true;
            stateChanged = true;
            break;
          case gameState[row][cell]:
            gameState[row][cell + direction] = 2 * gameState[row][cell];
            gameState[row][cell] = null
            addScore += gameState[row][cell + direction];
            updated = true;
            stateChanged = true;
            break;
          default:
        }
      }
    }
  }

  if(!stateChanged) return [null, 0];

  return [gameState, addScore];
}

const swipeVerticalMerge = (gameState, direction) => {
  let [start, end] = direction < 0 ? [1, 3] : [2, 0];
  let stateChanged = false;
  let addScore = 0;

  for(let col = 0; col < 4; ++ col) {
    if(gameState.every(v => v[col] === null)) continue;
    let updated = true;
    while(updated) {
      updated = false;
      for(let cell = start; cell * direction * (-1) <= end; cell -= direction) {
        if(gameState[cell][col] === null) continue;
        switch(gameState[cell + direction][col]) {
          case null:
            gameState[cell + direction][col] = gameState[cell][col];
            gameState[cell][col] = null;
            updated = true;
            stateChanged = true;
            break;
          case gameState[cell][col]:
            gameState[cell + direction][col] = 2 * gameState[cell][col];
            gameState[cell][col] = null
            addScore += gameState[cell + direction][col];
            updated = true;
            stateChanged = true;
            break;
          default:
        }
      }
    }
  }

  if(!stateChanged) return [null, 0];

  return [gameState, addScore];
}

const swipeMerge = (gameState, xdir, ydir) => {
  let xstart, xend, ystart, yend, xloopIncMult, yloopIncMult;
  switch(xdir) {
    case 1:
      [xstart, xend] = [2, 0];
      xloopIncMult = -1;
      break;
    case 0:
      [xstart, xend] = [0, 3];
      xloopIncMult = 1;
      break;
    case -1:
      [xstart, xend] = [1, 3];
      xloopIncMult = 1;
      break;
    default:
  }
  switch(ydir) {
    case 1:
      [ystart, yend] = [2, 0];
      yloopIncMult = -1;
      break;
    case 0:
      [ystart, yend] = [0, 3];
      yloopIncMult = 1;
      break;
    case -1:
      [ystart, yend] = [1, 3];
      yloopIncMult = 1;
      break;
    default:
  }
  let stateChanged = false;
  let addScore = 0;

  for(let row = ystart; row * yloopIncMult <= yend; row += yloopIncMult) {
    console.log('row', row);
    if(ydir === 0) {
      if(gameState[row].every(v => v === null)) continue;
    } else if(xdir === 0) {
      if(gameState.every(v => v[row] === null)) continue;
    }
    let updated = true;
    while(updated) {
      updated = false;
      for(let cell = xstart; cell * xloopIncMult <= xend; cell += xloopIncMult) {
        console.log('col', cell);
        if(gameState[row][cell] === null) continue;
        switch(gameState[row + ydir][cell + xdir]) {
          case null:
            gameState[row + ydir][cell + xdir] = gameState[row][cell];
            gameState[row][cell] = null;
            updated = true;
            stateChanged = true;
            break;
          case gameState[row][cell]:
            gameState[row + ydir][cell + xdir] = 2 * gameState[row][cell];
            gameState[row][cell] = null
            addScore += gameState[row + ydir][cell + xdir];
            updated = true;
            stateChanged = true;
            break;
          default:
        }
      }
    }
  }

  if(!stateChanged) return [null, 0];

  return [gameState, addScore];
}

export { initBoard, randomEntry, swipeHorizontalMerge, swipeVerticalMerge, swipeMerge }