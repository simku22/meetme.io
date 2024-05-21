import { Routes, HashRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Theme } from '@radix-ui/themes';
import { LandingPage } from './Landing.js';
import { JoinMeeting } from './JoinMeeting.js';
import axios from 'axios';
import './App.css';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginData, setLoginData] = useState({});

  function alterLoginStatus(status, data) {
    setLoginStatus(status);
    setLoginData(data);
  }

  console.log(loginStatus);
  console.log(loginData);

  return (
    <div id="app" className='ml-36 mr-36'>
      <Theme
        accentColor="indigo"
        grayColor="slate"
        panelBackground="translucent"
        scaling="100%"
        radius="medium"
        appearance="inherit"
      >
        <HashRouter>
          {<Header updateLogin={alterLoginStatus}/>}
          <Routes>
            <Route path="/" element={ <LandingPage logindata={loginData} /> } />
            <Route path="/join/:eventID" element={ <JoinMeeting/> } />
          </Routes>
          {/* <Footer /> */}
        </HashRouter>
      </Theme>
    </div>
  );
}

export default App;