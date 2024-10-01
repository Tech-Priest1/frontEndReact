import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    
    if (password.length < 5) {
      setError('A senha deve ter pelo menos 5 caracteres.');
      return;
    }
    if (cpf.length !== 11) {
      setError('O CPF deve conter exatamente 11 números.');
      return;
    }

    try {
      
      const response = await axios.post('http://localhost:5000/api/admin/register', { name, email, password, cpf });
      setSuccess(response.data.message); 

     
      setTimeout(() => {
        navigate('/editUsers');
      }, 1000);
    } catch (error) {
     
      const errorMessage = error.response?.data?.error || 'Erro ao registrar usuário. Verifique seus dados.';
      setError(errorMessage);
    }
  };

  const onLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Registrar Novo Usuário</div>
      </div>
      <br />
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='inputBox'
            required
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
            minLength={5}
            maxLength={8}
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
        <div className='separador'>
          <button type="submit" className='inputButton'>Registrar</button>
          <button type="button" onClick={onLoginClick} className='inputButton'>Ir para Login</button>
        </div>
      </form>

      {error && <p className='errorLabel'>{error}</p>}
      {success && <p className='successLabel'>{success}</p>}
    </div>
  );
};

export default Register;
