import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navBar.css';

const Navbar = ({ handleLogout }) => {
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

  return (
    <div className="navbar">
      <input className="inputButton" type="button" onClick={handleHome} value="Início" />
      <input className="inputButton" type="button" onClick={handleUsers} value="Gerenciar Usuários" />
      <input className="inputButton" type="button" onClick={editGymTypes} value="Gerenciar Modalidades" />
      <input className="inputButton" type="button" onClick={handleRegister} value="Registrar Membros" />
      <input className="inputButton" type="button" onClick={handleLogout} value="Log Out" />
    </div>
  );
};

export default Navbar;
