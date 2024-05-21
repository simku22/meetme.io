import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { Theme } from '@radix-ui/themes';
import { LandingPage } from './Landing.js'
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
          <Routes>
            <Route path="/" element={ <LandingPage /> } />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </Theme>
    </div>
  );
}

export default App;