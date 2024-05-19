import { Switch, Link } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import axios from 'axios';

export const Header = (props) => {
  async function logIn() {
    let response = await axios.get('http://localhost:3000/signin')
    .catch((error) => {
      console.log(error);
    })
    console.log(response);
    // props.login();
  }

  return (
    <>
      <div id="header" className="flex flex-row justify-between items-center min-w-lg">
        <div className="flex items-center">
          <img className="m-4 ml-2 mr-3 h-8" src="checked.png" alt="imhere.io main logo" />
        </div>
        <div className="flex flex-row justify-center items-center">
          {props.loggedin && <img src="user.png" className="h-8 m-2 transform hover:scale-110 transition-transform" />}
          {!props.loggedin && <Button onClick={logIn} className="h-8 m-2" size="2" variant="soft">Login</Button>}
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
  