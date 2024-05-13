import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import axios from 'axios';
import './App.css';

// //data will be the string we send from our server
// const apiCall = () => {
//   axios.get('http://localhost:3000/').then((data) => {
//     //this console.log will be in our frontend console
//     console.log(data);
//   })
// }

function App() {
  return (
    <div id="app" className='ml-36 mr-36'>
      <BrowserRouter>
        <Header />
        <Routes>

        </Routes>
        {/* TODO: STYLE FOOTER */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;