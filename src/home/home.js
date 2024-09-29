import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navBar/navBar';

const Home = (props) => {
  const { loggedIn, email, avatar, setLoggedIn } = props; 
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!loggedIn) return; // Only fetch members if logged in
      try {
        const response = await axios.get('http://localhost:5000/api/member'); // Adjust the API route as needed
        const membersWithGymTime = response.data.map(member => {
          const payingTime = new Date(member.payingTime);
          const currentTime = new Date();
          const timeDifference = Math.abs(currentTime - payingTime);
          const gymTime = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
          return {
            ...member,
            gymTime,
          };
        });
        setMembers(membersWithGymTime);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [loggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/member/${id}`); // Make sure the ID is correct
        setMembers(members.filter(member => member._id !== id)); // Update state after deletion
    } catch (error) {
        console.error("Error deleting member:", error);
    }
};

  const handleEdit = (id) => {
    navigate(`/editMember/${id}`);
  };

  return (
    <div className="mainContainer">
      <Navbar handleLogout={handleLogout} email={email} avatar={avatar} loggedIn={loggedIn} />
      <div className="titleContainerHome">
        <div>Gerenciador de Academia</div>
      </div>
      <div>
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
        <div>
          <div className="memberContainer">
            <h3 className="memberTitulo">Membros da Academia</h3>
            <ul className="memberList">
              {members.map((member) => (
                <li key={member._id} className="memberItem"> 
                  <b>Id:</b> {member._id} <b>Nome:</b> {member.name} / <b>Tempo de Academia:</b> {member.gymTime} Dias
                  <div className="separador">
                    <button type="button" onClick={() => handleEdit(member._id)}>Edit</button>
                    <button type="button" onClick={() => handleDelete(member._id)}>Delete</button>
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
