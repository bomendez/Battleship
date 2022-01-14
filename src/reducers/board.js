import { BOARD_CLICK, RESTART, SET_GAME_TYPE, UPDATE_SCORE } from "../actions/constants";
import { SIZE_TEN } from "../components/constants";

function initialStateFunc() {
  const initialState = {
  freePlay: false,
  user_board: buildBoard(),
  ai_board: buildBoard(),
  aiPlayed: true,
  aiScore: 0,
  playerScore: 0,
  freePlayScore: 0,
  }
  return initialState
 
}

  
function buildBoard(){
  let arr = []
  for(let i=0; i < 10; i++){
    arr.push(buildinitialRows())
  }
  arr = putShipsOnBoard(arr)
  return arr
}


function buildinitialRows(){
  let row = []
  for(let i=0; i< 10; i++){
    row.push(buildSquare());
  }
  return row;
}


function buildSquare(){
    let squareState = {
      hit:false,
      miss: false,
      isBoat: false,
      unselected: true
    }
  return squareState;
}


function putShipsOnBoard(board) {
  for(let ship in ships){
    board = placeOneShip(ship, ships[ship], board);
  }
  return board;
}


// Helper function to place one ship on board
function placeOneShip(shipType, shipSize, board) {
  let isVertical = getRandomInteger(2);

  let newRowCol = getRowAndCol(shipSize, isVertical);
  let randomRow = newRowCol[0];
  let randomCol = newRowCol[1];

  while (!shipPlacementValid(randomRow, randomCol, shipSize, isVertical, board)) {
    newRowCol = getRowAndCol(shipSize, isVertical);
    randomRow = newRowCol[0];
    randomCol = newRowCol[1];
  }
  board = fillShip(randomRow, randomCol, shipSize, isVertical, board);
  return board;
}


// Validates whether the ship overlaps an existing ship in the given player's
// ship attribute
function shipPlacementValid(row, col, length, isVertical, board) {
  // check each ship
  let currRow = row;
  let currCol = col;
  for (let i = 0; i < length; i++) {
    if (isVertical) {
      if (board[col][currRow].isBoat) {
        return false;
      }
      currRow++;
    } else {
      if (board[currCol][row].isBoat) {
        return false;
      }
      currCol++;
    }
  }
  return true;
}


// Adds the row/col of each ship to the given player's ships attribute
function fillShip(row, col, length, fillVertical, board) {
  let currRow = row;
  let currCol = col;
  for (let i = 0; i < length; i++) {
    if (fillVertical) {
      board[col][currRow].isBoat = true;
      currRow++;
    } else {
      board[currCol][row].isBoat = true;
      currCol++;
    }
  }
  return board;
}


// Helper function to get random row and column values
function getRowAndCol(shipSize, isVertical) {
  let rowMax = SIZE_TEN;
  let colMax = SIZE_TEN;
  if (isVertical) {
    rowMax = 9 - shipSize;
  } else {
    colMax = 9 - shipSize;
  }
  let randomRow = getRandomInteger(rowMax);
  let randomCol = getRandomInteger(colMax);
  return [randomRow, randomCol];
}


// Helper function that returns a random integer between
// 0 (inclusive) and a given maxInt (exclusive)
function getRandomInteger(maxInt) {
  return Math.floor(Math.random() * maxInt);
}



//define a dictionary of ships with respective lengths. 
const ships = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2
}

  
// // REDUCER STARTS HERE
export const BoardReducer = (state, action) => {
  if (state === undefined) {
    return initialStateFunc();
  }
  if (action.type === BOARD_CLICK) {
    let board;
    if (action.payload.enemy) {
      board = state.ai_board;
    } else {
      board = state.user_board
    }
    let boardCopy = board.map(function(arr){
      return arr.slice();
    });
    let squareCopy = { ...boardCopy[action.payload.row][action.payload.col] };
    squareCopy.hit = action.payload.hit;
    squareCopy.miss = action.payload.miss;
    squareCopy.unselected = action.payload.unselected;
    boardCopy[action.payload.row][action.payload.col] = squareCopy;
    if (action.payload.enemy) {
      return {
        ...state,
        ai_board : boardCopy,
        aiPlayed : false
      }
    } else {
      return {
        ...state,
        user_board : boardCopy,
        aiPlayed : true
      }
    }
  }
  if (action.type === UPDATE_SCORE) {
    return {
      ...state,
      aiScore: action.payload.aiScore,
      playerScore: action.payload.playerScore,
      freePlayScore: action.payload.freePlayScore,
    }
  }
  if (action.type === SET_GAME_TYPE){
    // if score >=17 reset to 0
     return {
     ...state,
     freePlay : action.payload.gameType === "normal" ? false : true,
     user_board: buildBoard(),
     ai_board: buildBoard(),
     aiPlayed: true
     }
  }
  if (action.type === RESTART) {
    let newUserBoard = []
    let newAIBoard = []
    newUserBoard = buildBoard()
    newAIBoard = buildBoard()
    return {
      ...state,
      freePlay: action.payload.isFreePlay,
      user_board: newUserBoard,
      ai_board: newAIBoard,
    }
  }
   return state;
};

