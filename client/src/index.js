import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "REDACTED",
    authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
    redirectUri: "http://localhost:3001/",
    clientSecret: "REDACTED",
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "localStorage", // or "sessionStorage" based on your preference
    storeAuthStateInCookie: true, // Set this to true if you want to store auth state in cookies
  },
}

const pca = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider >
);