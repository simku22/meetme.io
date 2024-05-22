import { Routes, HashRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Theme } from '@radix-ui/themes';
import { LandingPage } from './Landing.js';
import { Dashboard } from './Dashboard.js';
import { JoinMeeting } from './JoinMeeting.js';
import axios from 'axios';
import './App.css';

function App() {
  const [loginData, setLoginData] = useState({});

  function userSignIn(data) {
    setLoginData(data);
  }
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
          {<Header updateLogin={userSignIn}/>}
          <Routes>
            <Route path="/" element={ <LandingPage session={loginData} /> } />
            <Route path="/join/:eventID" element={ <JoinMeeting/> } />
            <Route path="/event/:eventID/dashboard" element={ <Dashboard/> } />
          </Routes>
          {/* <Footer /> */}
        </HashRouter>
      </Theme>
    </div>
  );
}

export default App;