import { Link} from 'react-router-dom';


function Instructions(){
    return(
        <div class="container">
                <h1>Instructions</h1>
                <h2>Setup</h2>
                <ul>
                    <li>Place your ships on the grid. These represent the location of the ships on a battlefield.</li>
                    <li>You will also have a blank second grid that represents your opponent;s battlefield.</li>
                </ul>
                <h2>In Play</h2>
                <ul>
                    <li>On your turn, pick a sqaure at random. This launches your first missle.</li>
                    <li>If your oppoenent's ship exists on that square, the opponenet board will display the hit.</li>
                    <li>On your opponenet's turn they take the same steps.</li>
                </ul>
                <h2>Winning</h2>
                <ul>The player who sinks all their opponenet's ships wins!</ul>
                <button class="buttons bottom_button"><Link to="/"> Go Back</Link> </button>
            </div>
    );
}

export default Instructions;