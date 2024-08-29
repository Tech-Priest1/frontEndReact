import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    setEmailError('')
    setPasswordError('')

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    if (email === '') {
      setEmailError('Digite um email')
      return
    }

    if (!emailRegex.test(email)) {
      setEmailError('Digite um email válido')
      return
    }

    if (password === '') {
      setPasswordError('Digite uma senha')
      return
    }

    if (password.length < 5) {
      setPasswordError('A senha precisa ter 5 ou mais caracteres')
      return
    }

 
  }
  const onRegisterClick = () => {
    navigate('/register')
  }


  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Login</div>
      </div>
      <br />
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
      <div className='inputContainer'>
        <input
          className='inputButton'
          type="button"
          onClick={onButtonClick}
          value='Log in'
        />
          <input
          className='inputButton'
          type="button"
          onClick={onRegisterClick}
          value='Register'
        />
      </div>
    </div>
  )
}

export default Login
