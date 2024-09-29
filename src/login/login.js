import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const DEFAULT_AVATAR_URL = '../public/avatar.png';
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    
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

      const contentType = response.headers.get('Content-Type');
      console.log('Content-Type:', contentType);

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          console.log('Login successful!');
          props.setLoggedIn(true);
          props.setEmail(data.email);

          
          localStorage.setItem('token', data.token); 
          console.log('Token stored:', localStorage.getItem('token')); 


          
          if (typeof props.setAvatar === 'function') {
            props.setAvatar(data.avatar || DEFAULT_AVATAR_URL);
          }
          navigate('/');
        } else {
          setPasswordError(data.message || 'Email ou senha inválidos');
        }
      } else {
        throw new Error('Invalid content-type, expected application/json');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPasswordError('Erro ao realizar login. Tente novamente mais tarde.');
    }
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Academia Unifit</div>
      </div>
      <div className='inputContainer'>
        <input
          value={email}
          placeholder="Digite seu email aqui"
          onChange={(ev) => setEmail(ev.target.value)}
          className='inputBox'
        />
        <label className="errorLabel">{emailError}</label>
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
      <div className="separador">
        <button
          className='submitButton'
          type="button"
          onClick={onButtonClick}>
          Log in
        </button>
        <button
          className='submitButton'
          type="button"
          onClick={onRegisterClick}>
          Criar conta
        </button>
      </div>
    </div>
  );
};

export default Login;
