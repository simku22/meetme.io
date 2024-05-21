import { Routes, BrowserRouter, Route, useHistory , Switch } from 'react-router-dom';
import { useState} from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Theme } from '@radix-ui/themes';
import { LandingPage } from './Landing.js'
import { AuthenticatedTemplate, UnauthenticatedTemplate , useMsal } from '@azure/msal-react';
import './App.css';

function App() {
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
          <Header/>
          <p>Anyone can see this paragraph.</p>
          <AuthenticatedTemplate>
            <p>At least one account is signed in!</p>
          </AuthenticatedTemplate>
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