import './App.css';
import { myController } from './controller/callAPI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello React
        <button id="getDataBtn" onClick={myController.getUsers}>Get Data</button>
        {/* <Abba></Abba> */}
      </header>
    </div>
  );
}

export default App;
