import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUsers = () => {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 ;

  const navigate = useNavigate();

  useEffect(() => {
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersToEdit = users.find(member => member.cpf === parseInt(cpf));

    if (usersToEdit) {
      setName(usersToEdit.name);
      setCpf(usersToEdit.cpf)
      setEmail(usersToEdit.email);
      setPassword(usersToEdit.password);
      

    } else {
      alert('Membro não encontrado!');
      navigate('/');
    }
  }, [cpf, navigate]);

  

  const onCancelClick = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedusers = users.map(user =>
      users.cpf === parseInt(cpf) ? { ...user, name, cpf, email, password } : users
    );

    localStorage.setItem('users', JSON.stringify(updatedusers));

    navigate('/');
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
          />
        </div>
        <br />
        <div className="separador">
          <button type="submit" className='inputButton'>Atualizar</button>
          <button type="submit" className='inputButton' onClick={onCancelClick}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
