import React from "react";
import {restart} from '../actions/restart';
import { useDispatch, useSelector } from 'react-redux';

export function Restart(props) {
    const isFreePlay = useSelector(state => state.BoardReducer.freePlay);
    const dispatch = useDispatch();

    function handleClick() {
        props.score();
        dispatch(restart(isFreePlay));
        
    }
    return (
        <button onClick={handleClick}>Restart</button>
    )
}

export default Restart;