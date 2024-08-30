import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
    
    const membersWithGymTime = storedMembers.map(member => ({
      ...member,
      gymTime: Math.floor(Math.random() * 101) 
    }));
    
    const randomValue = Math.floor(Math.random() * 101);
    localStorage.setItem('randomValue', randomValue);
    
    setMembers(membersWithGymTime);
  }, []);

  
  const handleDelete = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  const handleEdit = (id) => {
    navigate(`/editMember/${id}`);
  };

  return (
    <div className="mainContainer">
     
      <div className="titleContainerHome">
        <div>Gerenciamento da Academia</div>
      </div>
      <div>
        {loggedIn && <div>Bem-vindo, {email}!</div>}
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
        <div className="membrosContainer">
          <h3 className="membrosTitulo">Membros da Academia</h3>
          <ul className="membrosList">
            {members.map((member) => (
              <li key={member.id} className="memberItem">
                <b>Id:</b> {member.id} <b>Nome:</b> {member.name} / <b>Tempo de Academia:</b> {member.gymTime} Dias
                <div className="separador">
                  <button type="submitHome" className="inputButton" onClick={() => handleEdit(member.id)}>Edit</button>
                  <button type="submitHome" className="inputButton" onClick={() => handleDelete(member.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
