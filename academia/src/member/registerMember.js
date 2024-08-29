import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterMember = () => {
  const [name, setName] = useState('');
  const [gymType, setGymType] = useState('');
  const [price, setPrice] = useState('');
  const [gymTypes, setGymTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || [];
    setGymTypes(storedGymTypes);
  }, []);

  const onCancelClick = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const members = JSON.parse(localStorage.getItem('members')) || [];

    const existingMember = members.find(member => member.name === name);
    if (existingMember) {
      alert('Membro já existe!');
      return;
    }

    const lastMember = members[members.length - 1];
    const id = lastMember ? lastMember.id + 1 : 1;
    members.push({ id, name, gymType, price });
    localStorage.setItem('members', JSON.stringify(members));

    navigate('/');
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Registre um novo membro</div>
      </div>
      <form className='inputContainer' onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} className='inputBox' required />
        </div>
        <br />
        <div>
          <select value={gymType} onChange={(e) => setGymType(e.target.value)} className='inputBox' required>
            <option value="" disabled>Selecione a modalidade</option>
            {gymTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <input type="text" placeholder="Valor" value={price} onChange={(e) => setPrice(e.target.value)} className='inputBox' required />
        </div>
        <div className="separador">
          <button type="submit" className='inputButton'>Registrar</button>
          <button type="submit" className='inputButton' onClick={onCancelClick}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterMember;