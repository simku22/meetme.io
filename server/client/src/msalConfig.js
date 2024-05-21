import { Configuration } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId:  "REDACTED",
    authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
    redirectUri: "localhost:3000/redirect",
  }
}