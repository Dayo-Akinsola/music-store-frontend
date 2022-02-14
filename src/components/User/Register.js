import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import userAuth from '../../sevices/userService';

const Register = ({ inputInvalidStyle, inputValidStyle}) => {
  const [ credentials, setCredentials ] = useState({
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const [ errorMessages, setErrorMessages ] = useState({
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {name, username, password, passwordConfirm }  = credentials;
    let errorFound = false;

    if (name.length === 0) {
      const nameErrorMessage = 'Please provide a Name.';
      setErrorMessages( messages => ({...messages, 'name' : nameErrorMessage}));
      errorFound = true;
    } else {
      clearErrorMessage('name');
    }

    if (username.length < 5) {
      const usernameErrorMessage = username.length === 0 ? 'Please provide a Username.' : 'Your Username must be at least 5 characters';
      setErrorMessages( messages => ({ ...messages, 'username' : usernameErrorMessage}));
      errorFound = true;
    } else {
      clearErrorMessage('username');
    }

    if (password.length < 7) {
      const passwordLengthErrorMessage = password.length === 0 ? 'Please provide a Password' : 'Your Password must be at least 7 characters';
      setErrorMessages(messages => ({...messages, 'password' : passwordLengthErrorMessage}));
      errorFound = true;
    } else if (!isPasswordMixed(password)) {
      const passwordFormatErrorMessage = 'Password must contain letters with numbers or symbols';
      setErrorMessages(messages => ({...messages, 'password' : passwordFormatErrorMessage}));
      errorFound = true;
    } else {
      clearErrorMessage('password');
    }

    if (passwordConfirm !== password) {
      const confirmationErrorMessage = 'Must match the Password';
      setErrorMessages(messages => ({...messages, 'passwordConfirm' : confirmationErrorMessage}));
      errorFound = true;
    } else {
      clearErrorMessage('passwordConfirm');
    }

    if (!errorFound){
        const { name, username, password } = credentials;
        const response = await userAuth('http://localhost:3001/users/register', {name, username, password});
        if (response.ok) {
          navigate('/login');
        } else {
          const errorObj = await response.json();
          const serverErrorMessage = errorObj.error;
          if (serverErrorMessage.slice(0, 4) === 'User') {
            setErrorMessages(messages => ({...messages, username: 'This Username is already taken.'}))
          }
        }
    }
  }

  const removeErrorStyling = (event) => {
    const { name } = event.target;
    setErrorMessages(messages => ({...messages, [name] : ''}));
  }

  return (
    <div className="register">
      <h2 className="register__heading">Register</h2>
      <div className="register__form-wrapper">
        <form className="register__form" onSubmit={handleSubmit} noValidate>
        <div className="register__form--name-wrapper form-wrapper">
            <input 
              type="text" 
              name="name"
              className="register__form--name-input register-input" 
              placeholder="Name" 
              value={credentials.name}
              onChange={inputHandler}
              onFocus={removeErrorStyling} 
              style={errorMessages.name === '' ? inputValidStyle : inputInvalidStyle}
            />
            <div className="register__form--name-error-wrapper error-wrapper">
              <span className="register__form--name-error register-error">{errorMessages.name}</span>
            </div>
          </div>
          <div className="register__form--username-wrapper form-wrapper">
            <input 
              type="text" 
              name="username"
              className="register__form--username-input register-input" 
              placeholder="Username" 
              value={credentials.username}
              onChange={inputHandler}
              onFocus={removeErrorStyling} 
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
              onFocus={removeErrorStyling} 
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