import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navBar.css';

const Navbar = ({ handleLogout, email, avatar, updateAvatar, loggedIn }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/registerMember');
  };

  const handleUsers = () => {
    navigate('/editUsers');
  };

  const editGymTypes = () => {
    navigate('/editModality');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateAvatar(reader.result); // Update avatar with the base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-buttons">
        <input className="inputButton" type="button" onClick={handleHome} value="Início" />
        <input className="inputButton" type="button" onClick={handleUsers} value="Gerenciar Usuários" />
        <input className="inputButton" type="button" onClick={editGymTypes} value="Gerenciar Modalidades" />
        <input className="inputButton" type="button" onClick={handleRegister} value="Registrar Membros" />
        {/* Conditionally render the Logout button */}
        {loggedIn && <input className="inputButton" type="button" onClick={handleLogout} value="Sair" />}
      </div>
      <div className="navbar-email">
        {loggedIn && avatar && (  // Check if loggedIn and avatar exist
          <label>
            <img
              src={avatar}
              alt="User Avatar"
              onClick={() => document.getElementById('avatarInput').click()} 
              className="avatar" // Use CSS class for styling
            />
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }} // Hide the file input
            />
          </label>
        )}
        {loggedIn && email && <span> {email}</span>} {/* Conditionally render email */}
      </div>
    </div>
  );
};

export default Navbar;
