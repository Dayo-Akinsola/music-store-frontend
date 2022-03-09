import { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import Highlight from "./Highlight";

const SignUpSection = () => {
  const user = useContext(UserContext);
  const highlightSections = [
    {
      text: 'Keep track of when you made an order and when it will be delivered',
      icon: <svg width="24" className="home__highlight-icon" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 4H19C19.5523 4 20 4.44771 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44771 4 5 4ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM12 12C9.23858 12 7 9.31371 7 6H9C9 8.56606 10.6691 10 12 10C13.3309 10 15 8.56606 15 6H17C17 9.31371 14.7614 12 12 12Z" fill="currentColor" /></svg>,
    }, 
    {
      text: 'Save your details for quicker orders (We do not store payment information)',
      icon: <svg width="24" className="home__highlight-icon" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z" fill="currentColor" /><path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="currentColor" /><path d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z" fill="currentColor" /></svg>
    },
    {
      text: 'Review our collection of albums and rate them on a five star scale',
      icon: <svg width="24" className="home__highlight-icon" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z"/></svg>,
    },
    {
      text: 'Find and make friends so you can follow eachothers reviews',
      icon: <svg width="24" className="home__highlight-icon" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M16.993 14.001h2v2h1v-2h2v-1h-2v-2h-1v2h-2v1zm4.585 8.604c-.637-1.059-1.569-2.625-2.154-3.607-.517-.007-1.016-.085-1.49-.225l-.172 4.21h-11.462l-.283-6.222s-2.7 4.175-3.625 5.848c-.421.769-1.618.265-1.367-.548.608-1.952 1.948-6.316 2.669-8.859.2-.704.851-1.195 1.584-1.195h9.991c-.167.47-.274.968-.274 1.494 0 2.483 2.018 4.501 4.502 4.501.763 0 1.47-.209 2.1-.544.595 2.018 1.201 4.064 1.352 4.596.228.828-.89 1.348-1.371.551m-2.081-12.604c1.933 0 3.502 1.567 3.502 3.5 0 1.932-1.569 3.5-3.502 3.5-1.933 0-3.502-1.568-3.502-3.5 0-1.933 1.569-3.5 3.502-3.5m3.219 7.714l-.253-.853c.935-.825 1.537-2.018 1.537-3.361 0-2.484-2.018-4.5-4.503-4.5-1.562 0-2.936.797-3.744 2.005h-10.475c-1.179 0-2.225.792-2.546 1.924-.719 2.533-2.055 6.886-2.662 8.834-.047.151-.07.31-.07.485 0 .43.307 1.739 1.727 1.739.623 0 1.234-.338 1.542-.896.504-.914 1.29-2.189 1.891-3.144l.183 4.035h13.379l.162-3.937c.569.956 1.306 2.191 1.836 3.072.326.544.911.882 1.524.882.634 0 1.735-.497 1.735-1.741 0-.154-.021-.313-.065-.474-.291-1.022-.735-2.516-1.198-4.07m-10.701-17.715c-2.774 0-5.027 2.251-5.027 5.024s2.253 5.025 5.027 5.025c2.775 0 5.028-2.252 5.028-5.025 0-2.773-2.253-5.024-5.028-5.024m0 1c2.22 0 4.027 1.805 4.027 4.024 0 2.219-1.807 4.025-4.027 4.025s-4.026-1.806-4.026-4.025c0-2.219 1.806-4.024 4.026-4.024"/></svg>,
    },
    {
      text: 'Create a wishlist and share it with friends',
      icon: <svg width="24" className="home__highlight-icon" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M17.5354 2.87868C16.3638 1.70711 14.4644 1.70711 13.2928 2.87868L11.8786 4.29289C11.8183 4.35317 11.7611 4.41538 11.707 4.47931C11.653 4.41539 11.5958 4.3532 11.5355 4.29293L10.1213 2.87871C8.94975 1.70714 7.05025 1.70714 5.87868 2.87871C4.70711 4.05029 4.70711 5.94978 5.87868 7.12136L6.75732 8H1V14H3V22H21V14H23V8H16.6567L17.5354 7.12132C18.707 5.94975 18.707 4.05025 17.5354 2.87868ZM14.707 7.12132L16.1212 5.70711C16.5117 5.31658 16.5117 4.68342 16.1212 4.29289C15.7307 3.90237 15.0975 3.90237 14.707 4.29289L13.2928 5.70711C12.9023 6.09763 12.9023 6.7308 13.2928 7.12132C13.6833 7.51184 14.3165 7.51184 14.707 7.12132ZM10.1213 5.70714L8.70711 4.29293C8.31658 3.9024 7.68342 3.9024 7.29289 4.29293C6.90237 4.68345 6.90237 5.31662 7.29289 5.70714L8.70711 7.12136C9.09763 7.51188 9.7308 7.51188 10.1213 7.12136C10.5118 6.73083 10.5118 6.09767 10.1213 5.70714ZM21 10V12H3V10H21ZM12.9167 14H19V20H12.9167V14ZM11.0834 14V20H5V14H11.0834Z" fill="currentColor" /></svg>,

    },
  ]

  return  (
    <div className="home__sign-up">
      {
        user.token ?
          null
          :
          <div className="home__sign-up--heading-wrapper">
            <h4 className="home__sign-up--heading">Don't have an account?</h4>
            <Link className="home__sign-up--link" to="/register">
              <button className="home__sign-up--btn">Sign Up Here</button>
            </Link>
          </div>
      }
      <div className="home__sign-up--highlights">
        <span className="home__sign-up--highlights-info">An account lets you...</span>
        {
          highlightSections.map((highlight, index) => (
            <Highlight key={index} highlight={highlight} />
          ))
        }
      </div>
    </div>
  )
}

export default SignUpSection;