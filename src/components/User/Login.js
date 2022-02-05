import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <h2 className="login__heading">Login</h2>
      <div className="login__form-wrapper">
        <form className="login__form">
          <div className="login__form--username-wrapper form-wrapper">
            <input type="text" className="login__form--username-input login-input" placeholder="Username" />
            <span className="login__form--username-error login-error"></span>
          </div>
          <div className="login__form--password-wrapper form-wrapper">
            <input type="password" className="login__form--password-input login-input" placeholder="Password" />
            <span className="login__form--password-error login-error"></span>
          </div>
          <button className="login__form--submit-btn">Login</button>
        </form>
      </div>
      <span className="login__register-redirect">
        Don't have an account? <Link to="/register">Sign Up Here</Link>
        </span>
    </div>
  )
}

export default Login;