// PasswordInput.tsx
import React, { useState, ChangeEvent } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import "../../styles/components/Common.css";

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="auth-main">
      <input
        className="input-field"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={handlePasswordChange}
      />
      <span className="toggle-password" onClick={togglePasswordVisibility}>
        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
      </span>
    </div>
  );
};

export default PasswordInput;
