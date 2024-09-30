import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navBar.css';

const Navbar = ({ handleLogout, email, avatar, updateAvatar, loggedIn, role, name }) => {
  const navigate = useNavigate();
  const defaultAvatar = '/avatar.png'; 

 
  const handleHome = () => {
    
    const destination = role === 'admin' ? '/' : '/member/homeMember';
    navigate(destination);
  };

  const handleRegister = () => navigate('/registerMember');
  const handleUsers = () => navigate('/editUsers');
  const editGymTypes = () => navigate('/editModality');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateAvatar(reader.result); 
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-buttons">
      
        <input className="inputButton" type="button" onClick={handleHome} value="Início" />

        
        {role === 'admin' && (
          <>
            <input className="inputButton" type="button" onClick={handleUsers} value="Gerenciar Usuários" />
            <input className="inputButton" type="button" onClick={editGymTypes} value="Gerenciar Modalidades" />
            <input className="inputButton" type="button" onClick={handleRegister} value="Registrar Membros" />
          </>
        )}

      
        {loggedIn && <input className="inputButton" type="button" onClick={() => {
          
            handleLogout();
        }} value="Sair" />}
      </div>

      {/* Avatar e email/nome*/}
      <div className="navbar-email">
        {loggedIn && (
          <>
            <label>
              <img
                src={avatar || defaultAvatar}
                alt="User Avatar"
                onClick={() => document.getElementById('avatarInput').click()}
                className="avatar"
              />
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </label>
            {/* email para admin ou nome do membro */}
            <span>{role === 'admin' ? email : name}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
