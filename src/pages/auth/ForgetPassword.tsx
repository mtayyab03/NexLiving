import React, { useState } from "react";
import "../../styles/pages/auth/ForgetPassword.css";

import leaf from "../../assets/images/leaf.png";
import mainsplash from "../../assets/images/mainsplash.png";

// components
import MainButton from "../../components/common/MainButton";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUpClick = () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Your email is not correct.");
      return;
    }

    setErrorMessage("");
    window.location.href = "/forgetchangepassword";
  };

  return (
    <div className="main-container">
      <div className="left-container">
        <img src={mainsplash} alt="mainsplash" className="splash-container" />
      </div>
      <div className="login-area">
        <img src={leaf} alt="leaf" className="leaf-logo" />
        <div className="login-text">Forget your Password ?</div>
        <div className="logo-second">
          Don’t worry, it happens to the best of us! We will help you reset your
          password.
        </div>
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

          <MainButton onClick={handleSignUpClick} name="Send Reset Link" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
