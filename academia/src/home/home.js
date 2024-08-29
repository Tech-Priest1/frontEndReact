import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email, setLoggedIn } = props
  const navigate = useNavigate()
  const [members, setMembers] = useState([])

  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem('members')) || []
    setMembers(storedMembers)
  }, [])

  const handleLogout = () => {
    setLoggedIn(false)
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/RegisterMember')
  }

  const handleDelete = (id) => {
    const updatedMembers = members.filter(member => member.id !== id)
    setMembers(updatedMembers)
    localStorage.setItem('members', JSON.stringify(updatedMembers))
  }

  const handleEdit = (id) => {
    navigate(`/editMember/${id}`)
  }

  const editGymTypes = () => {
    navigate('/editModality')
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Sistem de Gerenciamente de Academia</div>
      </div>
      <div>
        {loggedIn && <div>Bem vindo, {email}!</div>}
        {!loggedIn && (
    <div>
      <div>Faça login para gerenciar a Academia.</div>
      <div className="separador">
        <button type="submit" className='inputButton'  onClick={() => navigate('/login')}>Login</button>
        <button type="submit" className='inputButton'  onClick={() => navigate('/register')}>Registrar</button>
      </div>
    </div>
  )}
      </div>
      {loggedIn && (
        <div>
          <div className="buttonContainer">
            <input className="inputButton" type="button" onClick={handleRegister} value="Registre um novo membro" />
            <input className="inputButton" type="button" onClick={handleLogout} value="Log out" />
          </div>
          <div className="buttonContainer">
          <input className="inputButton" type="button" onClick={editGymTypes} value="Editar Modalidades" />
          </div>
          
          <div className="membrosContainer">
  <h3 className="membrosTitulo">Membros da Academia</h3>
  <ul className="membrosList">
    {members.map((member) => (
      <li key={member.id} className="memberItem">
        {member.name} - Id: {member.id}
        <div className="separador">
          <button type="submit" className='inputButton' onClick={() => handleEdit(member.id)}>Edit</button>
          <button type="submit" className='inputButton' onClick={() => handleDelete(member.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
</div>
        </div>
      )}
    </div>
  )
}

export default Home