import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/auth/Login.css";

import leaf from "../../assets/images/leaf.png";
import mainsplash from "../../assets/images/mainsplash.png";

// components
import PasswordInput from "../../components/common/PasswordInput";
import MainButton from "../../components/common/MainButton";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
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

  const handleSignUpClick = () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Your email is not correct.");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage(
        "Your password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage("");
    window.location.href = "/";
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
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <MainButton onClick={handleSignUpClick} name="Sign Up" />
        </div>

        <div className="container-signup">
          <p>
            If have an account?
            <Link to="/" className="signup">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
