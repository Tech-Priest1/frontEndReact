import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './homeMember.css';

const HomeMember = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedModalities, setRelatedModalities] = useState([]);

  useEffect(() => {
    const fetchMember = async () => {
      if (!loggedIn) return;
      const token = localStorage.getItem('token');
      const userId = jwtDecode(token)?.id;

      try {
        const response = await axios.get(`http://localhost:5000/api/member/${userId}`);
        const memberData = response.data;

        // Calculate gym time
        const payingTime = new Date(memberData.payingTime);
        const currentTime = new Date();
        const timeDifference = Math.abs(currentTime - payingTime);
        const gymTime = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        setMember({ ...memberData, gymTime }); // Add gymTime to the member object
      } catch (error) {
        setError("Error fetching member data.");
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [loggedIn]);

  const fetchRelatedModalities = useCallback(async () => {
    if (!member) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/gym/modalities/type/${member._id}`);
      setRelatedModalities(response.data);
    } catch (error) {
      console.error("Error fetching related modalities:", error);
    }
  }, [member]);

  useEffect(() => {
    fetchRelatedModalities();
  }, [member, fetchRelatedModalities]);

  const handleEdit = () => {
    if (member) {
      navigate(`/editMember/${member._id}`);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const token = localStorage.getItem('token');
      const userId = jwtDecode(token)?.id;

      const response = await axios.put(
        `http://localhost:5000/api/member/${userId}/avatar`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // Update the member object with the new avatar URL
      setMember({ ...member, avatar: response.data.avatar });
    } catch (error) {
      console.error('Error updating avatar:', error);
      setError('Error updating avatar.');
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
        <div className="contentContainer">
          {/* Member Details Section */}
          <div className="memberCard">
            <div className="memberDetails">
              <label>
                <img
                  src={member.avatar || '/avatar.png'}
                  alt="User Avatar"
                  className="avatar"
                  onClick={() => document.getElementById('avatarInput').click()}
                />
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </label>
              <div className="memberInfo">
                <h3>{member.name}</h3>
                <p><b>CPF:</b> {member.cpf}</p>
                <p><b>Número:</b> {member.number}</p>
                <p><b>Modalidade:</b> {member.gymType}</p>
                <p><b>Tempo de Academia:</b> {member.gymTime} Dias</p> {/* Display gym time */}
                <div className="separador">
                  <button type="button" onClick={handleEdit}>Edit</button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Modalities Section */}
          {relatedModalities.length > 0 && (
            <div className="relatedModalities">
              <h4>Modalidades Relacionadas Em promoção:</h4>
              {relatedModalities.map((modality) => (
                <div key={modality._id} className="modalityCard">
                  <h5>{modality.name}</h5>
                  {member.gymTime > 30 ? (
                    <p><b>Preço Promocional:</b> {modality.promotionalPrice}</p>
                  ) : (
                    <p><b>Preço Normal:</b> {modality.normalPrice}</p>
                  )}
                  <p><b>Dias de Treino:</b> {modality.trainingDays}</p>
                  <p><b>Tipo de Modalidade:</b> {modality.modalityType}</p>
                  <p><b>Horário de Treino:</b> {modality.trainingTime}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeMember;
