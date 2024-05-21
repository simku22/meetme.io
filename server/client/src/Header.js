import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

export const Header = (props) => {
  const location = useNavigate();

  const [loginStatus, setLoginStatus] = useState(false);
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    const showMe = async () => {
      let res = await axios.get(`${window.location.origin}/user/myIdentity`);
      console.log('Entered in root useEffect');
      if (res && res.data && res.data.status) {
        setLoginStatus(res.data.status === 'loggedin');
        setLoginData(res.data);
        props.updateLogin(res.data.status === 'loggedin', res.data);
        await axios.post(`${window.location.origin}/user/create`, {
          email: res.data.userInfo.username,
        });
      } else {
        console.log("error fetching login state");
      }
    };
    showMe();
  }, [location]);

  return (
    <>
      <div id="header" className="flex flex-row justify-between items-center min-w-lg">
        <div className="flex items-center">
          <img className="m-4 ml-2 mr-3 h-8" src="checked.png" alt="imhere.io main logo" />
        </div>
        <div className="flex flex-row justify-center items-center">
          {loginStatus && <img src="user.png" className="h-8 m-2 transform hover:scale-110 transition-transform" />}
          <a href={`${window.location.origin}/${loginStatus ? "signout" : "signin"}`}>
            <Button className="h-8 m-2" size="2" variant="soft">
              {loginStatus ? "Logout" : "Login"}
            </Button>
          </a>
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
  