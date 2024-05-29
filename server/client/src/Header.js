import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"; 
import axios from 'axios';

export const Header = (props) => {
  const location = useNavigate();
  const [ loginData, setLoginData ] = useState({});

  useEffect(() => {
    const showMe = async () => {
      let res = await axios.get(`${window.location.origin}/user/myIdentity`);
      if (res && res.data && res.data.status) {
        setLoginData(res.data);
        props.updateLogin(res.data);
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
          {/* For the time being we have no use case for the profile icon */}
          {/* {loginData.status === 'loggedin' && <img src="user.png" className="h-8 transform hover:scale-110 transition-transform" />} */}
          <a href={`${window.location.origin}/${loginData.status === 'loggedin' ? "signout" : "signin"}`}>
            <Button className="h-8 m-2" size="2" variant="soft">
              {loginData.status === 'loggedin' ? "Logout" : "Login"}
            </Button>
          </a>
          {loginData.status === 'loggedin' && 
            <Avatar className="transform hover:scale-110 transition-transform mr-4">
              <AvatarImage src={`https://github.com/${loginData.userInfo.username.split('@')[0]}.png`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          }
          <a className="ml-auto" href="https://github.com/info441-sp24/final-project-simku22" target="_blank" rel="noopener noreferrer">
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
  