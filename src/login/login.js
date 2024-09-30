import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState(''); 
  const [loginType, setLoginType] = useState('admin'); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpfError, setCpfError] = useState(''); 
  const DEFAULT_AVATAR_URL = '../public/avatar.png';
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    setCpfError(''); 

    if (loginType === 'admin') {
      // eslint-disable-next-line
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (email === '') {
        setEmailError('Digite um email');
        return;
      }

      if (!emailRegex.test(email)) {
        setEmailError('Digite um email válido');
        return;
      }

      if (password === '') {
        setPasswordError('Digite uma senha');
        return;
      }

      if (password.length < 5) {
        setPasswordError('A senha precisa ter 5 ou mais caracteres');
        return;
      }

    
      try {
        const response = await fetch('http://localhost:5000/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          props.setLoggedIn(true);
          props.setEmail(data.email); 
          props.setUserRole(data.role); 
          localStorage.setItem('token', data.token);
          if (typeof props.setAvatar === 'function') {
              props.setAvatar(data.avatar || DEFAULT_AVATAR_URL);
          }
          navigate('/'); 
        } else {
          setPasswordError(data.message || 'Email ou senha inválidos');
        }
      } catch (error) {
        setPasswordError('Erro ao realizar login. Tente novamente mais tarde.');
      }
    } else {
     
      if (cpf === '') {
        setCpfError('Digite o CPF');
        return;
      }

      if (password === '') {
        setPasswordError('Digite uma senha');
        return;
      }

      if (password.length < 5) {
        setPasswordError('A senha precisa ter 5 ou mais caracteres');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/member/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cpf, password }),
        });

        const data = await response.json();

        if (response.ok) {
          props.setLoggedIn(true);
          props.setEmail(data.name); 
          props.setUserRole(data.role); // guarda a role do BD
          localStorage.setItem('token', data.token);
          if (typeof props.setAvatar === 'function') {
              props.setAvatar(data.avatar || DEFAULT_AVATAR_URL);
          }
          navigate('/member/homeMember');
        } else {
          setPasswordError(data.message || 'CPF ou senha inválidos');
        }      
      } catch (error) {
        setPasswordError('Erro ao realizar login. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Academia Unifit</div>
      </div>
      <div className='inputContainer'>
        <select
          value={loginType}
          onChange={(ev) => setLoginType(ev.target.value)}
          className="loginTypeDropdown"
        >
          <option value="admin">Admin Login</option>
          <option value="member">Membro Login</option>
        </select>
      </div>
      <div className='inputContainer'>
        {loginType === 'admin' ? (
          <>
            <input
              value={email}
              placeholder="Digite seu email aqui"
              onChange={(ev) => setEmail(ev.target.value)}
              className='inputBox'
            />
            <label className="errorLabel">{emailError}</label>
          </>
        ) : (
          <>
            <input
              value={cpf}
              placeholder="Digite seu CPF aqui"
              onChange={(ev) => setCpf(ev.target.value)}
              className='inputBox'
            />
            <label className="errorLabel">{cpfError}</label>
          </>
        )}
      </div>
      <br />
      <div className='inputContainer'>
        <input
          type="password"
          value={password}
          placeholder="Digite sua senha aqui"
          onChange={(ev) => setPassword(ev.target.value)}
          className='inputBox'
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <button
        className='submitButton'
        type="button"
        onClick={onButtonClick}>
        Log in
      </button>
    </div>
  );
};

export default Login;
