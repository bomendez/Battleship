import React from 'react';
import '../square.css';
import { boardClick } from '../actions/board';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';



export function Square(props) {
const user_board = useSelector(state => state.BoardReducer.user_board);
const ai_board = useSelector(state => state.BoardReducer.ai_board);
const [hover, setHover] = useState(false)
let board_state;
  if(props.enemy){
    board_state = ai_board;
  }else{
    board_state = user_board;
  }

    const isFreePlay = useSelector(state => state.BoardReducer.freePlay);
    const dispatch = useDispatch();
    

    function setMouseEnter() {
        setHover(true);
    }

    function setMouseLeave() {
        setHover(false)
    }

    let colorClass='unclicked';
    let hoverClass = 'hoverClass';

    let icon = "";
    if(!props.enemy){
    if (props.is_boat) {
        colorClass = 'ship';
        icon = "fa fa-ship";
    }
    }

    if (props.hit) {
        colorClass = 'hitSquare';
        icon = "fa fa-bomb";
    } else if (props.miss) {
        colorClass = 'clickedBox';
        icon = "fa fa-check-square";
    }

    

    function handleClick(){
        
        let unselected = board_state[props.row][props.col].unselected; 
        if(unselected){
            let isHit = false;
            if(board_state[props.row][props.col].isBoat){
                isHit = true;
            }
            dispatch(boardClick(props.row, props.col, props.enemy, isHit, !isHit, !unselected))
            if(isHit){
                props.toIncrementScore(1);
            }else{
                props.toIncrementScore(0);
            }
        }
    }

    return (
        <td  className={hover? hoverClass : colorClass} onClick={handleClick} onMouseEnter={setMouseEnter} onMouseLeave={setMouseLeave}>
            {<i class={icon}></i>}
        </td>
    )

}
