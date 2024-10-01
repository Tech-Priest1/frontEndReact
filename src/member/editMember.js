import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditMember = ({ isAdmin }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [gymType, setGymType] = useState('');
  const [price, setPrice] = useState('');
  const [gymTypes, setGymTypes] = useState([]);
  const [payingTime, setPayingTime] = useState('');
  const [alertShown, setAlertShown] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token inválido!');
      navigate('/');
    }
    
    const fetchMember = async () => {
      try {
        const memberResponse = await axios.get(`http://localhost:5000/api/member/${id}`);
        const member = memberResponse.data;

        const gymTypesResponse = await axios.get('http://localhost:5000/api/gym/');
        setGymTypes(gymTypesResponse.data);

        if (member) {
          setName(member.name);
          setGymType(member.gymType);
          setPrice(member.price);
          setPayingTime(member.payingTime || '');
        } else {
          alert('Membro não encontrado!');
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching member or gym types:", error);
        alert('Erro ao buscar membro!');
        navigate('/');
      }
    };

    fetchMember();
  }, [id, navigate]);

  useEffect(() => {
    if (gymType && payingTime) {
      const selectedGymType = gymTypes.find(type => type.name === gymType);
      if (selectedGymType) {
        const currentTime = new Date();
        const startTime = new Date(payingTime);
        const timeDifference = Math.abs(currentTime - startTime);
        const daysSincePayingTime = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
        setPrice(daysSincePayingTime > 30 ? selectedGymType.promotionalPrice : selectedGymType.normalPrice);
  
        if (isAdmin && daysSincePayingTime > 30) {
          if (!alertShown) { 
            alert('Este membro é elegível para o preço promocional!');
            setAlertShown(true); 
          }
        } else {
          setAlertShown(false); 
        }
      }
    }
  }, [gymType, payingTime, gymTypes, isAdmin, alertShown]);
  

  const handleGymTypeChange = (selectedGymType) => {
    setGymType(selectedGymType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const memberData = { name, gymType, price, payingTime };

    try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/member/${id}`, memberData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (isAdmin) {
            navigate('/');  
        } else {
            navigate('/member/homeMember'); 
        }
    } catch (error) {
        console.error("Error updating member:", error);
        alert('Erro ao atualizar membro!');
    }
  };

  const handleCancel = () => {
    if (isAdmin) {
      navigate('/');
    } else {
      navigate('/member/homeMember');
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Editar Membro</div>
      </div>
      <form className='inputContainer' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='inputBox'
            required
          />
        </div>
        <br />
        <div>
          <select
            value={gymType}
            onChange={(e) => handleGymTypeChange(e.target.value)}
            className='inputBox'
            required
          >
            <option value="" disabled>Mudar Modalidade</option>
            {gymTypes.map((type, index) => (
              <option key={index} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
        <br />
        {gymType && (
          <div>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='inputBox'
              required
            >
              <option value={gymTypes.find(type => type.name === gymType)?.normalPrice || ''}>
                Normal: {gymTypes.find(type => type.name === gymType)?.normalPrice || ''}
              </option>
              {isAdmin && (
                <option value={gymTypes.find(type => type.name === gymType)?.promotionalPrice || ''}>
                  Promocional: {gymTypes.find(type => type.name === gymType)?.promotionalPrice || ''}
                </option>
              )}
            </select>
          </div>
        )}
        <br />
        <div>
          <input
            type="date"
            placeholder="Data de Pagamento"
            value={payingTime}
            onChange={(e) => setPayingTime(e.target.value)}
            className='inputBox'
            required
          />
        </div>
        <br />
        <div className="separador">
          <button type="submit" className='inputButton'>Atualizar</button>
          <button type="button" className='inputButton' onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
