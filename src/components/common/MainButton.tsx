import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Common.css";

interface MainButtonProps {
  to?: string;
  name: string;
  onClick?: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ to, name, onClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  if (to) {
    return (
      <Link to={to} className="gradient-button" onClick={handleClick}>
        {name}
      </Link>
    );
  } else {
    return (
      <button className="gradient-button" onClick={handleClick}>
        {name}
      </button>
    );
  }
};

export default MainButton;
