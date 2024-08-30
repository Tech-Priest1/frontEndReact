import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterMember = () => {
  const [name, setName] = useState('');
  const [cpf, setcpf] = useState('');
  const [gymType, setGymType] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('normal'); 
  const [payingTime, setPayingTime] = useState(''); // New state for paying time
  const [gymTypes, setGymTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || [];
    setGymTypes(storedGymTypes);
  }, []);

  useEffect(() => {
    if (gymType) {
      const selectedGymType = gymTypes.find(type => type.name === gymType);
      if (selectedGymType) {
        setPrice(priceType === 'normal' ? selectedGymType.normalPrice : selectedGymType.promotionalPrice);
      }
    }
  }, [gymType, priceType, gymTypes]);

  const onCancelClick = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const members = JSON.parse(localStorage.getItem('members')) || [];

    const existingMember = members.find(member => member.cpf === cpf);
    if (existingMember) {
      alert('Membro já existe!');
      return;
    }

    const lastMember = members[members.length - 1];
    const id = lastMember ? lastMember.id + 1 : 1;

    // Add the member with the paying time
    members.push({ id, name, cpf, gymType, price, payingTime });
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
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setcpf(e.target.value)}
            className='inputBox'
            required
          />
        </div>
        <br />
        <div>
          <select
            value={gymType}
            onChange={(e) => setGymType(e.target.value)}
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
        <div>
          <select
            value={priceType}
            onChange={(e) => setPriceType(e.target.value)}
            className='inputBox'
            required
          >
            <option value="normal">Preço Normal</option>
            <option value="promotional">Preço Promocional</option>
          </select>
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Valor"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='inputBox'
            required
            readOnly
          />
        </div>
        <br />
        <div>
          <input
            type="date"
            placeholder="Data de Pagamento"
            value={payingTime}
            onChange={(e) => setPayingTime(e.target.value)} // data do pagamento
            className='inputBox'
            required
          />
        </div>
        <br />
        <div className="separador">
          <button type="submit" className='inputButton'>Registrar</button>
          <button type="button" className='inputButton' onClick={onCancelClick}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterMember;
