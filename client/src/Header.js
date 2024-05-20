import { Button, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useIsAuthenticated } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';

export const Header = () => {
  const isAuthenticated = useIsAuthenticated();

  const { instance, inProgress } = useMsal();

  const initializeSignIn = () => {
    instance.loginRedirect();
  };

  const initializeLogOut = () => {
    instance.logoutRedirect();
  };

  return (
    <>
      <div id="header" className="flex flex-row justify-between items-center min-w-lg">
        <div className="flex items-center">
          <img className="m-4 ml-2 mr-3 h-8" src="checked.png" alt="imhere.io main logo" />
        </div>
        <div className="flex flex-row justify-center items-center">
          {isAuthenticated && <img src="user.png" className="h-8 m-2 transform hover:scale-110 transition-transform" />}
          {!inProgress ? <Spinner /> : (
            <Button className="h-8 m-2" size="2" variant="soft" onClick={isAuthenticated ? initializeLogOut : initializeSignIn}>
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          )}
          <a className="ml-auto" href="test" target="_blank" rel="noopener noreferrer">
            <img
              className="h-6 transform hover:scale-110 transition-transform"
              src="github.png"
              alt="GitHub"
            />
          </a>
          {/* <a className="ml-4 mr-2" href="https://discord.com/" target="_blank" rel="noopener noreferrer">
            <img className="h-6 transform hover:scale-110 transition-transform" src="discord.png" alt="Discord" />
          </a> */}
        </div>
      </div>
      <hr className="border border-black" />
    </>
  );
};
  