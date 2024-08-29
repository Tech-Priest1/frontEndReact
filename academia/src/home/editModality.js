import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditModality = () => {
  const [gymTypes, setGymTypes] = useState([])
  const [newGymType, setNewGymType] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || []
    setGymTypes(storedGymTypes)
  }, [])

  const handleAddGymType = () => {
    if (newGymType.trim()) {
      const updatedGymTypes = [...gymTypes, newGymType]
      setGymTypes(updatedGymTypes)
      localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes))
      setNewGymType('')
    }
  }

  const handleDeleteGymType = (index) => {
    const updatedGymTypes = gymTypes.filter((_, i) => i !== index)
    setGymTypes(updatedGymTypes)
    localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes))
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Editar Tipos de Inscrição</div>
      </div>
      <div className="inputContainer">
        <ul>
          {gymTypes.map((gymType, index) => (
            <li key={index}>
              {gymType}
              <button  className="inputButton" type="button" onClick={() => handleDeleteGymType(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Novo Tipo de Inscrição"
          value={newGymType}
          onChange={(e) => setNewGymType(e.target.value)}
          className="inputBox"
        />
        <button type="submit" className='inputButton'onClick={handleAddGymType}  >Adicionar</button>
        <button type="submit" className='inputButton' onClick={handleCancel}  >Cancelar</button>
      </div>
    </div>
  )
}

export default EditModality
