import logo from './logo.svg';
import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:3000/').then((data) => {
    //this console.log will be in our frontend console
    console.log(data);
  })
}

function App() {
  return (
    <div className="App">
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={apiCall}>Make API Call</button>
    </div>
  );
}

export default App;