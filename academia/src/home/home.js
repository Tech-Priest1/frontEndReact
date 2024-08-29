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
    navigate(`/edit-member/${id}`)
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Sistem de Gerenciamente de Academia</div>
      </div>
      <div>
        {loggedIn && <div>Bem vindo, {email}!</div>}
        {!loggedIn && <div>Faça login para gerenciar a Academia.</div>}
      </div>
      {loggedIn && (
        <div>
          <div className="buttonContainer">
            <input
              className="inputButton"
              type="button"
              onClick={handleRegister}
              value="Registre um novo membro"
            />
            <input
              className="inputButton"
              type="button"
              onClick={handleLogout}
              value="Log out"
            />
          </div>
          <div className="membrosContainer">
            <h3>Membros da Academia</h3>
            <ul>
              {members.map((member) => (
                <li key={member.id} className="memberItem">
                  {member.name} - {member.email}
                  <button onClick={() => handleEdit(member.id)}>Edit</button>
                  <button onClick={() => handleDelete(member.id)}>Delete</button>
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