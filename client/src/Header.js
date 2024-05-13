import { Link } from 'react-router-dom';

export const Header = (props) => {
    return (
      <>
        <div id="header" className="flex flex-row justify-left items-center min-w-lg">
          <img className="m-4 ml-2 mr-3 h-8" src="checked.png" alt="imhere.io main logo"/>
          <Link to="/about">
           <p className="text-lg pl-2 pr-2 pb-1 border-b-4 border-transparent hover:border-black hover:border-b-2 hover:border-b border-opacity-0 hover:border-opacity-100 transition-transform transform hover:translate-y-px">ABOUT</p>
          </Link>
          <a className="ml-auto" href="test" target="_blank" rel="noopener noreferrer">
            <img
              className="h-6 transform hover:scale-110 transition-transform"
              src="github.png"
              alt="GitHub"
            />
          </a>
          <a className="ml-4 mr-2" href="https://discord.com/" target="_blank" rel="noopener noreferrer">
            <img className="h-6 transform hover:scale-110 transition-transform"
            src='discord.png'
            alt='Discord'
            />
          </a>
        </div>
        <hr className="border border-black"></hr>
      </>
    );
  };
  