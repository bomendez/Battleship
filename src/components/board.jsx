import React from "react";
import { useSelector } from "react-redux";
import { Square } from "./square";



function Board(props) {
  const user_board = useSelector(state => state.BoardReducer.user_board);
  const ai_board = useSelector(state => state.BoardReducer.ai_board);
  const isFreePlay = useSelector(state => state.BoardReducer.freePlay);

  let board_state;
  if(props.enemy){
    board_state = ai_board;
  }else{
    board_state = user_board;
  }
  
  const board = initializeBoard();
  
  function initializeBoard() {
    let gridRows = [];
    for(let row=0; row < board_state.length; row++){
      const rowSquares = [];
      for(let col=0; col < board_state[row].length; col++){
        let square_state = board_state[row][col];
        if(props.enemy){
        rowSquares.push(<Square row={row} col={col} enemy={props.enemy} hit={square_state.hit} miss={square_state.miss} unselected={square_state.unselected} is_boat={square_state.isBoat}
        toIncrementScore={doIncrementScore}/>)
        }else{
          rowSquares.push(<Square row={row} col={col} enemy={props.enemy} hit={square_state.hit} miss={square_state.miss} unselected={square_state.unselected} is_boat={square_state.isBoat} 
          toIncrementScore={doIncrementScore}/>)
        }
      }
      gridRows.push(<tr>{rowSquares}</tr>);
    }
    return gridRows;
  }

 

function doIncrementScore(isHitScore){
  props.doIncrementEnemyScore(isHitScore);
}


  return (
    <div class="table-responsive">      
    <table className="board-class">
      <tbody>{board}</tbody>
    </table>
    </div>
  );
}

export default Board;
