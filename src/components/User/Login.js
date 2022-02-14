import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../../sevices/userService";

const Login = ({ inputInvalidStyle, inputValidStyle, setUser }) => {

  const [ credentials, setCredentials ] = useState({
    username: '',
    password: '',
  });

  const [ errorMessage, setErrorMessage ] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    const  { name, value } = event.target;
    setCredentials({...credentials, [name] : value});
  }

  const removeInputErrorStyling = (event) => {
    setErrorMessage('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await userAuth('http://localhost:3001/users/login', {...credentials});
    if (response.ok) {
      setErrorMessage('');
      const user = await response.json();
      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/');
    } else {
      const errorObj = await response.json();
      const serverErrorMessage = errorObj.error;
      setErrorMessage(serverErrorMessage);
    }
  }
 
  return (
    <div className="login">
      <h2 className="login__heading">Login</h2>
      <div className="login__form-wrapper">
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form--username-wrapper form-wrapper">
            <input 
              type="text" 
              className="login__form--username-input login-input" 
              name="username" 
              placeholder="Username"
              onChange={handleChange}
              onFocus={removeInputErrorStyling}
              value={credentials.username}
              style={errorMessage === '' ? inputValidStyle : inputInvalidStyle}
            />
          </div>
          <div className="login__form--password-wrapper form-wrapper">
            <input 
              type="password" 
              className="login__form--password-input login-input" 
              name="password" 
              placeholder="Password"
              onChange={handleChange}
              onFocus={removeInputErrorStyling}
              value={credentials.password}
              style={errorMessage === '' ? inputValidStyle : inputInvalidStyle}
            />
          </div>
          <button className="login__form--submit-btn">Login</button>
        </form>
      </div>
      {
        errorMessage === '' 
        ? null
        : (
          <div className="login__error--container">
            <span className="login__error--message">{errorMessage}</span>
          </div>
        )
      }
      <span className="login__register-redirect">
        Don't have an account? <Link to="/register">Sign Up Here</Link>
        </span>
    </div>
  )
}

export default Login;