import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditMember = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [gymType, setGymType] = useState('');
  const [price, setPrice] = useState('');
  const [gymTypes, setGymTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [payingTime, setPayingTime] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const memberToEdit = members.find(member => member.id === parseInt(id));

    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || [];
    setGymTypes(storedGymTypes);

    if (memberToEdit) {
      setName(memberToEdit.name);
      setGymType(memberToEdit.gymType);
      setPrice(memberToEdit.price);
      setPayingTime(memberToEdit.payingTime || ''); // carrega a data de pagamento
    } else {
      alert('Membro não encontrado!');
      navigate('/');
    }
  }, [id, navigate]);

  const calculateDaysSincePayingTime = (payingTime) => {
    const currentTime = new Date();
    const startTime = new Date(payingTime);
    const timeDifference = Math.abs(currentTime - startTime);
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
  };

  const handleGymTypeChange = (selectedGymType) => {
    setGymType(selectedGymType);

    const selectedGymTypeObj = gymTypes.find(type => type.name === selectedGymType);
    if (selectedGymTypeObj) {
      const daysSincePayingTime = calculateDaysSincePayingTime(payingTime);
      if (daysSincePayingTime > 30) {
        setPrice(selectedGymTypeObj.promotionalPrice);
        setMessage(`Esse usuário está elegível ao preço promocional / Dias de academia: ${daysSincePayingTime}.`);
      } else {
        setPrice(selectedGymTypeObj.normalPrice);
        setMessage(`Esse usuário não está elegível ao preço promocional / Dias de academia: ${daysSincePayingTime}. Mínimo: 30 dias.`);
      }
    }
  };

  const handlePriceChange = (selectedPrice) => {
    setPrice(selectedPrice);
  };

  const onCancelClick = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const members = JSON.parse(localStorage.getItem('members')) || [];
    const updatedMembers = members.map(member =>
      member.id === parseInt(id) ? { ...member, name, gymType, price, payingTime } : member 
    );

    localStorage.setItem('members', JSON.stringify(updatedMembers));
    navigate('/');
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
       
        {gymType && (
          <div>
            <select
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
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
        <div className="mensageEditMembers">
          {message && <p>{message}</p>} {/* local aviso de promoção*/}
        </div>
        <div className="separador">
          <button type="submit" className='inputButton'>Atualizar</button>
          <button type="submit" className='inputButton' onClick={onCancelClick}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
