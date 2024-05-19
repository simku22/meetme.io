import { Routes, BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { useState} from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Theme } from '@radix-ui/themes';
import { LandingPage } from './Landing.js'
import './App.css';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function toggleLoggedIn() {
    setLoggedIn(!loggedIn);
  };

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
        <BrowserRouter>
          <Header login={toggleLoggedIn} loggedin={loggedIn}/>
          <Routes>
            <Route path="/" element={
              <LandingPage />
            } />
          </Routes>
          {/* <Footer /> */}
          <p>{process.env.proxy}</p>
        </BrowserRouter>
      </Theme>
    </div>
  );
}

export default App;