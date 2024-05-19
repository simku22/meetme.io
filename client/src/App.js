import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Theme } from '@radix-ui/themes';
import { LandingPage } from './Landing.js'
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
  const [loggedIn, setLoggedIn] = useState(true);

  function toggleLoggedIn() {
    setLoggedIn(!loggedIn);
  };

  return (
    <div id="app" className='ml-36 mr-36'>
      <Theme
        accentColor="green"
        grayColor="slate"
        panelBackground="translucent"
        scaling="100%"
        radius="medium"
        appearance="inherit"
      >
        <BrowserRouter>
          <Header login={toggleLoggedIn} loggedin={loggedIn}/>
          <Routes>
            <Route path="/" element={
              <LandingPage />
            } />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </Theme>
    </div>
  );
}

export default App;