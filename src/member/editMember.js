import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditMember = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [gymType, setGymType] = useState('');
  const [price, setPrice] = useState('');
  const [gymTypes, setGymTypes] = useState([]);
  const [payingTime, setPayingTime] = useState('');
  const navigate = useNavigate();

  // Fetch member data and gym types from MongoDB when component mounts
  useEffect(() => {
    const fetchMember = async () => {
      try {
        // Fetch member by ID
        const memberResponse = await axios.get(`http://localhost:5000/api/member/${id}`);
        const member = memberResponse.data;

        // Fetch gym types from MongoDB
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
    if (gymType) {
      const selectedGymType = gymTypes.find(type => type.name === gymType);
      if (selectedGymType) {
        const daysSincePayingTime = calculateDaysSincePayingTime(payingTime);
        setPrice(daysSincePayingTime > 30 ? selectedGymType.promotionalPrice : selectedGymType.normalPrice);
      }
    }
  }, [gymType, payingTime, gymTypes]);

  const calculateDaysSincePayingTime = (payingTime) => {
    if (!payingTime) return 0; // Handle case when payingTime is not set
    const currentTime = new Date();
    const startTime = new Date(payingTime);
    const timeDifference = Math.abs(currentTime - startTime);
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const handleGymTypeChange = (selectedGymType) => {
    setGymType(selectedGymType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const memberData = { name, gymType, price, payingTime };

    try {
      const token = localStorage.getItem('token');
      console.log('Token before PUT:', token);
      await axios.put(`http://localhost:5000/api/member/${id}`, memberData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/'); // Redirect after successful update
    } catch (error) {
      console.error("Error updating member:", error);
      alert('Erro ao atualizar membro!');
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
            <option value="" disabled>Selecione a modalidade</option>
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
              <option value={gymTypes.find(type => type.name === gymType)?.promotionalPrice || ''}>
                Promocional: {gymTypes.find(type => type.name === gymType)?.promotionalPrice || ''}
              </option>
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
          <button type="button" className='inputButton' onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
