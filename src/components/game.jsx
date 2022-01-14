import React, { useState, useEffect } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { boardClick } from '../actions/board';
import { updateScore } from '../actions/updateScore';
 
function Game() {
        const dispatch = useDispatch();
        const isFreePlay = useSelector(state => state.BoardReducer.freePlay);
        const user_board = useSelector(state => state.BoardReducer.user_board);
        const ai_board = useSelector(state => state.BoardReducer.ai_board);
        const aiPlayed = useSelector(state => state.BoardReducer.aiPlayed);
        const aiScore = useSelector(state => state.BoardReducer.aiScore);
        const playerScore = useSelector(state => state.BoardReducer.playerScore);
        const freePlayScore = useSelector(state => state.BoardReducer.freePlayScore);

        let winner = ""
        if (aiScore == 17) {
            winner = "AI wins! Better luck next time."
        }
        if (playerScore == 17 || freePlayScore == 17) {
            winner = "You win! Congrats!"
        }
      
        function getRandomInteger(maxInt) {
            return Math.floor(Math.random() * maxInt);
          }
        
          function isUnselected(x_coord, y_coord) {
            if(user_board[x_coord][y_coord].unselected){
                return true;
            }else{
                return false
            }
        }

        
        function checkCoordinateIsShip(x_coord, y_coord) {
            if(user_board[x_coord][y_coord].isBoat){
                return true;
            }
                return false
          }
        
          function aiTurn() {
            let x = getRandomInteger(10)
            let y = getRandomInteger(10)
    
            while (!isUnselected(x, y)) {
                // get random number unselected
                x = getRandomInteger(10)
                y = getRandomInteger(10)
            }
            let hitShip = checkCoordinateIsShip(x, y);
            //exited while loop means, isUnselected returned true
            let unselected = false;
            let isEnemyBoard = false;
            dispatch(boardClick(x, y, isEnemyBoard, hitShip, !hitShip, unselected))
            if(hitShip){
                // get score and use set function here
                let oldScore = aiScore;
                dispatch(updateScore(oldScore + 1, playerScore, freePlayScore))
            }
          }

          const resetScores = function() {
            // use set function here
            dispatch(updateScore(0, 0, 0))
          }
        
          if(!aiPlayed && !isFreePlay){
            aiTurn();
          }
        
          function incrementPlayerScore(isHit){
            // use set function here
            if (isFreePlay) {
                dispatch(updateScore(aiScore, playerScore, freePlayScore + isHit))
            } else {
                dispatch(updateScore(aiScore, playerScore + isHit, freePlayScore))
            }
          }

        if(isFreePlay){
            return(
                <div className="container board-wrapper">
                <h1>Battleship</h1>
                <h2>{winner}</h2>
                <Restart score={resetScores}/>
                <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <h3>Your Score: {freePlayScore}</h3>
                    {/* <div className="ScoreBoard">          
                    Ships Hit: {(17- boardStats.player_zero.score)}</div>
                    <div className={winnerBoardClass}> Congratulations! You hit all ships</div> */}
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                    <Board enemy ={true} doIncrementEnemyScore={incrementPlayerScore}/>
                </div>
                </div>
            </div>);
        }else{
        return (
        <div className="container board-wrapper">
            <h1>Battleship</h1>            
            <h2>{winner}</h2>
            {/* <div className="ScoreBoard">ScoreBoard: 
            Player: {playerTurn} <span> </span>
            Score: {playerTurn === 0 ? (17 - boardStats.player_one.score): (17- boardStats.player_zero.score)}</div>
            <div className={winnerBoardClass}>Player {playerZeroWins ? 0 : 1} wins the game</div> */}
            <Restart score={resetScores}/>
            <div className="row">
                <div className='col-lg-6 col-md-12 col-sm-12 playerBoard'>
                    <h3>Your Board, AI Score: {aiScore}</h3>
                    <Board enemy={false}/>
                </div>
                
                <div className="col-lg-6 col-md-12 col-sm-12">
                <h3>Enemy Board, Your Score: {playerScore}</h3>
                    <Board enemy={true} doIncrementEnemyScore={incrementPlayerScore}/>
                </div>
            </div>
        </div>);
        }
}
 
export default Game;