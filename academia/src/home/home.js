import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const { loggedIn, email, setLoggedIn } = props;
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
    // Add random "Gym Time" to each member
    const membersWithGymTime = storedMembers.map(member => ({
      ...member,
      gymTime: Math.floor(Math.random() * 101) 
    }));
    setMembers(membersWithGymTime);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/RegisterMember');
  };

  const handleDelete = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const handleEdit = (id) => {
    navigate(`/editMember/${id}`);
  };

  const editGymTypes = () => {
    navigate('/editModality');
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Sistem de Gerenciamento de Academia</div>
      </div>
      <div>
        {loggedIn && <div>Bem vindo, {email}!</div>}
        {!loggedIn && (
          <div>
            <div>Faça login para gerenciar a Academia.</div>
            <div className="separador">
              <button type="submit" className='inputButton' onClick={() => navigate('/login')}>Login</button>
              <button type="submit" className='inputButton' onClick={() => navigate('/register')}>Registrar</button>
            </div>
          </div>
        )}
      </div>
      {loggedIn && (
        <div>
          <div className="buttonContainer">
            <input className="inputButton" type="button" onClick={handleRegister} value="Registrar Membros" />
            <input className="inputButton" type="button" onClick={editGymTypes} value="Gerenciar Modalidades" />
            <input className="inputButton" type="button" onClick={handleLogout} value="Log Out" />
          </div>

          <div className="membrosContainer">
            <h3 className="membrosTitulo">Membros da Academia</h3>
            <ul className="membrosList">
              {members.map((member) => (
                <li key={member.id} className="memberItem">
                  <b>Id:</b> {member.id} <b>Nome:</b> {member.name} / <b>Tempo de Academia:</b> {member.gymTime} Dias
                  <div className="separador">
                    <button type="submitHome" onClick={() => handleEdit(member.id)}>Edit</button>
                    <button type="submitHome" onClick={() => handleDelete(member.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
