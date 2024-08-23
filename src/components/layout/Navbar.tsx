import React, { useState } from "react";
import { FaHome, FaInfo, FaServicestack, FaPhone } from "react-icons/fa";
import Modal from "react-modal";

// components
import "../../styles/components/layout/Navbar.css";

import {
  profileeicon,
  settingicon,
  profileimg,
  passwordicon,
  changepassimage,
  signouticon,
} from "../../assets/images"; // Import image assets

const Navbar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName === selectedItem ? null : itemName);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example: Minimum 8 characters, at least one letter and one number

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Handle password change logic here (e.g., make API call)
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    closeModal();
  };

  const renderNavbarItem = (
    icon: JSX.Element,
    text: string,
    itemName: string
  ) => {
    const isSelected = itemName === selectedItem;
    return (
      <div
        key={itemName}
        className={`navbar-item ${isSelected ? "selected" : ""}`}
        onClick={() => handleItemClick(itemName)}
      >
        {React.cloneElement(icon, {
          className: `navbar-icon-scroll ${isSelected ? "selected" : ""}`,
          color: isSelected ? "#7ec646" : "#333", // add this line to change icon color
        })}
        <p className={`navbar-text ${isSelected ? "selected" : ""}`}>{text}</p>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="scrollNav">
        {[
          {
            icon: <FaHome className="navbar-icon-scroll" />,
            text: "Home",
            name: "Home",
          },
          {
            icon: <FaInfo className="navbar-icon-scroll" />,
            text: "About",
            name: "About",
          },
          {
            icon: <FaServicestack className="navbar-icon-scroll" />,
            text: "Services",
            name: "Services",
          },
          {
            icon: <FaPhone className="navbar-icon-scroll" />,
            text: "Contact",
            name: "Contact",
          },
        ].map(({ icon, text, name }) => renderNavbarItem(icon, text, name))}
      </div>
      <div className="navFixed">
        <div className="navbar-item-fixed">
          <FaHome className="navbar-icon" />
        </div>
        <div className="navbar-item-fixed">
          <FaInfo className="navbar-icon" />
        </div>
        <div className="navbar-item-fixed">
          <FaServicestack className="navbar-icon" />
        </div>
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src={profileimg} alt="profile" className="profile-image" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="profile-mail">
                <img src={profileimg} alt="profile" className="profile-image" />
                <div className="profile-info">
                  <span className="profile-name">Annie James</span>
                  <span className="profile-email">hello@anniejames.com</span>
                  <div className="profile-separator"></div>
                </div>
              </div>
              <div className="dropdown-item">
                <img
                  src={profileeicon}
                  alt="profile"
                  className="dropdown-profile-image"
                />
                <span className="dropdown-text">My Profile</span>
              </div>
              <div className="dropdown-item">
                <img
                  src={settingicon}
                  alt="profile"
                  className="dropdown-profile-image"
                />
                <span className="dropdown-text">Settings</span>
              </div>
              <div className="dropdown-item" onClick={openModal}>
                <img
                  src={passwordicon}
                  alt="profile"
                  className="dropdown-profile-image"
                />
                <span className="dropdown-text">Change Password</span>
              </div>
              <div className="dropdown-item">
                <img
                  src={signouticon}
                  alt="profile"
                  className="dropdown-profile-image"
                />
                <span className="dropdown-text">Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Change Password Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <img
            src={changepassimage}
            alt="modalimage"
            className="modal-passimage"
          />
          <h2 className="modal-heading">Change Password</h2>
        </div>
        <form className="change-password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <input
            type="password"
            name="newPassword"
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm New Password:"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </nav>
  );
};

export default Navbar;
