import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditMember = () => {
  const { id } = useParams() // Get the member ID from the URL
  const [name, setName] = useState('')
  const [gymType, setGymType] = useState('')
  const [price, setPrice] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem('members')) || []
    const memberToEdit = members.find(member => member.id === parseInt(id))

    if (memberToEdit) {
      setName(memberToEdit.name)
      setGymType(memberToEdit.gymType)
      setPrice(memberToEdit.price)
    } else {
      alert('Membro não encontrado!')
      navigate('/')
    }
  }, [id, navigate])

  const onCancelClick = () => {
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const members = JSON.parse(localStorage.getItem('members')) || []
    const updatedMembers = members.map(member =>
      member.id === parseInt(id) ? { ...member, name, gymType, price } : member
    )

    localStorage.setItem('members', JSON.stringify(updatedMembers))

    navigate('/')
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Editar Membro</div>
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
            type="gymType"
            placeholder="Tipo da Inscrição"
            value={gymType}
            onChange={(e) => setGymType(e.target.value)}
            className='inputBox'
            required
          />
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
          />
        </div>
        <div className="separador">
          <button type="submit" className='inputButton'>Atualizar</button>
          <button type="submit" className='inputButton' onClick={onCancelClick}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default EditMember
