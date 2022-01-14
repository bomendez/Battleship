import { Routes, Route, Link } from "react-router-dom";
import Landing from './components/Landing.jsx';
import Instructions from './components/Instructions.jsx';
import Game from './components/game.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Battleship.css';

function App() {
  return (
    
    <div className="App">
      <Routes>
        {/* <Switch> */}
          <Route path='/' element={<Landing/>} />
          <Route path='/game-board' element={<Game/>} />
          <Route path='/instructions' element={<Instructions/>}  />
        {/* </Switch> */}

      </Routes>
    </div>
    
  );
}

export default App;
