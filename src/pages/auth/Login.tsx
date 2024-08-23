import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../../styles/pages/auth/Login.css";

import leaf from "../../assets/images/leaf.png";
import applelogo from "../../assets/images/applelogo.png";
import facebooklogo from "../../assets/images/facebooklogo.png";
import googlelogo from "../../assets/images/googlelogo.png";
import mainsplash from "../../assets/images/mainsplash.png";

import PasswordInput from "../../components/common/PasswordInput";
import MainButton from "../../components/common/MainButton";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleKeepLoggedInChange = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignInClick = () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Your email is not correct.");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage("Your password is not correct.");
      return;
    }
    if (!keepLoggedIn) {
      setErrorMessage("Please check the 'Keep me Logged In' checkbox.");
      return;
    }
    setErrorMessage("");
    window.location.href = "/otp";
  };

  return (
    <div className="main-container">
      <div className="left-container">
        <img src={mainsplash} alt="mainsplash" className="splash-container" />
      </div>
      <div className="login-area">
        <img src={leaf} alt="leaf" className="leaf-logo" />
        <div className="login-text">Welcome to Treppan Living</div>
        <div className="logo-second">Sustainable luxury, Redefined homes</div>
        <div className="auth-container">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="auth-main">
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="checkbox-container">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                className="checkbox"
                checked={keepLoggedIn}
                onChange={handleKeepLoggedInChange}
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Keep me Logged In
              </label>
            </div>
            <a href="/forgetpassword" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <MainButton onClick={handleSignInClick} name="Sign In" />
        </div>

        <div className="line-with-text">
          <div className="line"></div>
          <div className="text">Or</div>
          <div className="line"></div>
        </div>

        <div className="row">
          <div className="box">
            <img src={facebooklogo} alt="Facebook" className="box-logo" />
          </div>
          <div className="box">
            <img src={googlelogo} alt="Google" className="box-logo" />
          </div>
          <div className="box">
            <img src={applelogo} alt="Apple" className="box-logo" />
          </div>
        </div>

        <div className="container">
          <p>
            Don’t have an account ?
            <Link to="/signup" className="signup">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
