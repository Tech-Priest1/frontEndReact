import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterMember = () => {
  const [name, setName] = useState('')
  const [gymType, setgymType] = useState('')
  const [price, setPrice] = useState('')

  const navigate = useNavigate()

  const onCancelClick = () => {
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const members = JSON.parse(localStorage.getItem('members')) || []

    const existingMember = members.find(members => members.name === name)
    if (existingMember) {
      alert('Membro já existe!')
      return
    }

    const lastMember = members[members.length - 1];
    const id = lastMember ? lastMember.id + 1 : 1;
    members.push({ id, name, gymType, price });
    localStorage.setItem('members', JSON.stringify(members));

    navigate('/')
  }

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
          <input type="gymType" placeholder="Tipo da Inscrição" value={gymType} onChange={(e) => setgymType(e.target.value)} className='inputBox' required />
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
  )
}

export default RegisterMember
