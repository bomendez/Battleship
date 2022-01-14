import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {setGameType} from '../actions/gametype';
function Landing(){
    const dispatch = useDispatch();

    function setNormalGame(){
        let gametype = "normal";
        dispatch(setGameType(gametype));
    }

    function setFreePlay(){
        let gametype = "free";
        dispatch(setGameType(gametype));
    }
    return(
        <div class="container">
        <h1>Welcome to Battleship</h1>
        <p>Please choose your game type</p>
        <div class="game_mode">
            <Link to="/game-board" gameType="normal"><button class="buttons game" onClick={setNormalGame}>Normal Game</button></Link>
            <Link to="/game-board" gameType="freePlay"><button class="buttons game" onClick={setFreePlay}>Free Play</button></Link>
        </div>
        <Link to="/instructions"><button class="buttons bottom_button">Instructions >>> </button></Link>
    </div>
    )
} 

export default Landing;