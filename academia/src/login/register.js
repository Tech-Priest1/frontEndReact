import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      setError('Usuário já existe!')
      return
    }

    const id = users.length + 1
    users.push({ id, name, email, password, cpf })
    localStorage.setItem('users', JSON.stringify(users))

    setSuccess('Usuário registrado com sucesso!')

    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  const onLoginClick = () => {
    navigate('/login')
  }

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
        <br/>
        <div className='inputContainer'>
          <button type="leftsubmit" className='inputButton'>Registrar</button>
        </div>
      </form>
      {error && <p className='errorLabel'>{error}</p>}
      {success && <p className='successLabel'>{success}</p>}
      <div className='inputContainer'>
        <button type="rightsubmit" onClick={onLoginClick} className='inputButton'>Ir para Login</button>
      </div>
    </div>
  )
}

export default Register
