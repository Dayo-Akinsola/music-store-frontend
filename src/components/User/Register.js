import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
  const { credentials, setCredentials } = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    
  })

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name] : value,
    })
  }
  console.log(credentials);

  if (credentials) {
    return (
      <div className="register">
        <h2 className="register__heading">Register</h2>
        <div className="register__form-wrapper">
          <form className="register__form" noValidate>
            <div className="register__form--username-wrapper form-wrapper">
              <input 
                type="text" 
                name="username"
                className="register__form--username-input register-input" 
                placeholder="Username" 
                value={credentials.username}
                onChange={inputHandler} 
              />
              <span className="register__form--username-error register-error"></span>
            </div>
            <div className="register__form--password-wrapper form-wrapper">
              <input 
                type="password"
                name="password"
                className="register__form--password-input register-input" 
                placeholder="Password" 
                value={credentials.password}
                onChange={inputHandler} 
              />
              <span className="register__form--password-error register-error"></span>
            </div>
            <div className="register__form--password-confirm-wrapper form-wrapper">
              <input 
                type="password" 
                name="passwordConfirm"
                className="register__form--password-confirm-input register-input" 
                placeholder="Confirm Password" 
                value={credentials.passwordConfirm}
                onChange={inputHandler} 
              />
              <span className="register__form--password-confirm-error register-error"></span>
            </div>
            <button className="register__form--submit-btn">Register</button>
          </form>
        </div>
        <span className="register__login-redirect">
          Already have an account? <Link to="/login">Log In Here</Link>
          </span>
      </div>
    )  
  }
  
  return null;
}

export default Register;