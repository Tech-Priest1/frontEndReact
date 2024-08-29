import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterMember = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const members = JSON.parse(localStorage.getItem('members')) || []

    const existingMember = members.find(member => member.email === email)
    if (existingMember) {
      alert('Member already exists!')
      return
    }

    const id = members.length + 1
    members.push({ id, name, email, cpf })
    localStorage.setItem('members', JSON.stringify(members))

    navigate('/home')
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Register New Member</div>
      </div>
      <form className='inputContainer' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
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
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className='inputBox'
            required
          />
        </div>
        <br />
        <button type="submit" className='inputButton'>Register</button>
      </form>
    </div>
  )
}

export default RegisterMember
