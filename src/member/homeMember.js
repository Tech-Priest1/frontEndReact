import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';

const HomeMember = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const avatar = "path_to_default_avatar"; 

  useEffect(() => {
    const fetchMember = async () => {
      if (!loggedIn) return;
      const token = localStorage.getItem('token');
      const userId = jwtDecode(token)?.id; 

      try {
        const response = await axios.get(`http://localhost:5000/api/member/${userId}`);
        setMember(response.data);
      } catch (error) {
        setError("Error fetching member data.");
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMember();
  }, [loggedIn]);

  const handleEdit = () => {
    if (member) {
    console.log(`/editMember/${member._id}`); 
      navigate(`/editMember/${member._id}`);
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainerHome">
        <div>Perfil do Membro</div>
      </div>
      {loading && <div>Loading member data...</div>}
      {error && <div>{error}</div>}
      {member && (
        <div className="memberDetails">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <h3>{member.name}</h3>
          <p><b>CPF:</b> {member.cpf}</p>
          <p><b>Número:</b> {member.number}</p>
          <p><b>Modalidade:</b> {member.gymType}</p>
          <p><b>Tempo de Academia:</b> {member.gymTime} Dias </p>
          {/* Add other member-specific details as needed */}
          <div className="separador">
            <button type="button" onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMember;
