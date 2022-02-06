import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Register = ({ inputInvalidStyle, inputValidStyle}) => {
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const [ errorMessages, setErrorMessages ] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    const checkPasswordConfirmMatch = () => {
      if (credentials.password === credentials.passwordConfirm) {
        setErrorMessages(messages => ({...messages, passwordConfirm: ''}));
      }
    }

    checkPasswordConfirmMatch();
  }, [credentials.password, credentials.passwordConfirm])

  const inputHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'passwordConfirm') {
      const { password, passwordConfirm } = credentials;
      const passwordMatchError = (password !== passwordConfirm) ? 'Must match the password' : '';
      setErrorMessages(messages => ({...messages, passwordConfirm: passwordMatchError}));
    }
    setCredentials({
      ...credentials,
      [name] : value,
    });
  }

  const isPasswordMixed = (pass) => {
    let onlyLetters = false;
    let noLetters = false;
    for (let i = 0; i < pass.length; i++) {
      const charCode = pass.charCodeAt(i);
      if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) {
        onlyLetters = true;
      } else {
        noLetters = true
      }
    }
    return onlyLetters && noLetters;
  }

  const clearErrorMessage = (name) => {
    setErrorMessages(messages => ({...messages, [name] : ''}));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const {username, password, passwordConfirm }  = credentials;

    if (username.length < 5) {
      const usernameErrorMessage = username.length === 0 ? 'Please provide a Username.' : 'Your Username must be at least 5 characters';
      setErrorMessages( messages => ({ ...messages, 'username' : usernameErrorMessage}));
    } else {
      clearErrorMessage('username');
    }

    if (password.length < 7) {
      const passwordLengthErrorMessage = password.length === 0 ? 'Please provide a Password' : 'Your Password must be at least 7 characters';
      setErrorMessages(messages => ({...messages, 'password' : passwordLengthErrorMessage}));
    } else if (!isPasswordMixed(password)) {
      const passwordFormatErrorMessage = 'Password must contain letters with numbers or symbols';
      setErrorMessages(messages => ({...messages, 'password' : passwordFormatErrorMessage}));
    } else {
      clearErrorMessage('password');
    }

    if (passwordConfirm !== password) {
      const confirmationErrorMessage = 'Must match the Password';
      setErrorMessages(messages => ({...messages, 'passwordConfirm' : confirmationErrorMessage}));
    } else {
      clearErrorMessage('passwordConfirm');
    }

  }

  return (
    <div className="register">
      <h2 className="register__heading">Register</h2>
      <div className="register__form-wrapper">
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <div className="register__form--username-wrapper form-wrapper">
            <input 
              type="text" 
              name="username"
              className="register__form--username-input register-input" 
              placeholder="Username" 
              value={credentials.username}
              onChange={inputHandler} 
              style={errorMessages.username === '' ? inputValidStyle : inputInvalidStyle}
            />
            <div className="register__form--username-error-wrapper error-wrapper">
              <span className="register__form--username-error register-error">{errorMessages.username}</span>
            </div>
          </div>
          <div className="register__form--password-wrapper form-wrapper">
            <input 
              type="password"
              name="password"
              className="register__form--password-input register-input" 
              placeholder="Password" 
              value={credentials.password}
              onChange={inputHandler} 
              style={errorMessages.password === '' ? inputValidStyle : inputInvalidStyle}
            />
            <div className="register__form--password-error-wrapper error-wrapper">
              <span className="register__form--password-error register-error">{errorMessages.password}</span>
            </div>
          </div>
          <div className="register__form--password-confirm-wrapper form-wrapper">
            <input 
              type="password" 
              name="passwordConfirm"
              className="register__form--password-confirm-input register-input" 
              placeholder="Confirm Password" 
              value={credentials.passwordConfirm}
              onChange={inputHandler} 
              style={errorMessages.passwordConfirm === '' ? inputValidStyle : inputInvalidStyle}
            />
            <div className="register__form--password-confirm-error-wrapper error-wrapper">
              <span className="register__form--password-confirm-error register-error">{errorMessages.passwordConfirm}</span>
            </div>
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

export default Register;