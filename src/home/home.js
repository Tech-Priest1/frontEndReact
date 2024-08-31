import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navBar/navBar'; 

const Home = (props) => {
  const { loggedIn, email, setLoggedIn } = props;
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem('members')) || [];

    const membersWithGymTime = storedMembers.map(member => {
      const payingTime = new Date(member.payingTime);
      const currentTime = new Date();
      const timeDifference = Math.abs(currentTime - payingTime);
      const gymTime = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // calcula os dias baseado na data de pagamento
      return {
        ...member,
        gymTime,
      };
    });

    setMembers(membersWithGymTime);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

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
      <Navbar handleLogout={handleLogout} />
      <div className="titleContainerHome">
        <div>Gerenciador de Academia</div>
      </div>
      <div>
        {loggedIn && <div>Bem-vindo, {email}!</div>}
        {!loggedIn && (
          <div>
            <div className='homeLoginText'>Faça login para começar</div>
            <div className="separador">
              <button type="button" className='inputButton' onClick={() => navigate('/login')}>Login</button>
              <button type="button" className='inputButton' onClick={() => navigate('/register')}>Registrar</button>
            </div>
          </div>
        )}
      </div>
      {loggedIn && (
        <div className="memberContainer">
          <h3 className="memberTitulo">Membros da Academia</h3>
          <ul className="memberList">
            {members.map((member) => (
              <li key={member.id} className="memberItem">
                <b>Id:</b> {member.id} <b>Nome:</b> {member.name} / <b>Tempo de Academia:</b> {member.gymTime} Dias
                <div className="separador">
                  <button type="button" onClick={() => handleEdit(member.id)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(member.id)}>Delete</button>
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
