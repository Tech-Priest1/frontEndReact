import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registerMember.css';
const RegisterMember = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [number, setNumber] = useState('');
  const [gymType, setGymType] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState('normal'); 
  const [payingTime, setPayingTime] = useState('');
  const [password, setPassword] = useState(''); 
  const [gymTypes, setGymTypes] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchGymTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gym/'); 
        setGymTypes(response.data);
      } catch (error) {
        console.error("Error fetching gym types:", error);
      }
    };
    fetchGymTypes();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const memberData = {
      name,
      cpf,
      number,
      gymType,
      price,
      payingTime,
      password, 
    };

    try {
      await axios.post('http://localhost:5000/api/member/register', memberData); 
      navigate('/'); 
    } catch (error) {
      console.error("Error ao registrar membro:", error);
      alert('Erro ao registrar membro!');
    }
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
            onChange={(e) => setCpf(e.target.value)}
            className='inputBox'
            required
            minLength={11}
            maxLength={11}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className='inputBox'
            required
            minLength={9}
            maxLength={11}
          />
        </div>
        <br />
        <div>
          <input
            type="password" 
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setPayingTime(e.target.value)}
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
