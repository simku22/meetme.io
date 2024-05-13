import logo from './logo.svg';
import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:3001/').then((data) => {
    //this console.log will be in our frontend console
    console.log(data);
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
