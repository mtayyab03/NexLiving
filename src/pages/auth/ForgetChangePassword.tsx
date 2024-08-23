import React, { useState } from "react";
import "../../styles/pages/auth/SignUp.css";

import leaf from "../../assets/images/leaf.png";
import mainsplash from "../../assets/images/mainsplash.png";

// components
import PasswordInput from "../../components/common/PasswordInput";
import MainButton from "../../components/common/MainButton";

const ForgetChangePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  const isValidPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUpClick = () => {
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
        <div className="login-text">Recover Password</div>
        <div className="logo-second">
          Provide your new password to get your account back!
        </div>
        <div className="auth-container">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <MainButton onClick={handleSignUpClick} name="Confirm" />
        </div>
      </div>
    </div>
  );
};

export default ForgetChangePassword;
