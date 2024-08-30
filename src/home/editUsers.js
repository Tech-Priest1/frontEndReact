import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditModality = () => {
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedCpf, setEditedCpf] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleEditUser = (index) => {
    const user = users[index];
    setEditingUserIndex(index);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedPassword(user.password);
    setEditedCpf(user.cpf);
  };

  const handleSaveUser = () => {
    if (editingUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingUserIndex] = {
        ...updatedUsers[editingUserIndex],
        name: editedName,
        email: editedEmail,
        password: editedPassword,
        cpf: editedCpf,
      };
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setEditingUserIndex(null);
    }
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
const handleAdicionar =() =>{
    navigate('/register');
 }
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="userContainer">
      <div>
        <h3 className="userTitulo">Gerenciar Usuários</h3>
      </div>
      <ul className="userList">
        {users.map((user, index) => (
          <li key={index}> 
            {user.name} <b>/</b> {user.email} <b>/</b> {user.cpf}
            <div className="separadorUser1">
            <button type="submit" className="inputButton" onClick={() => handleEditUser(index)}>Edit</button>
            <button type="submit" className="inputButton" onClick={() => handleDeleteUser(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingUserIndex !== null && (
        <div className="fixedBottom">
          <input
            type="text"
            placeholder="Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="inputBoxUser"
          />
          <input
            type="email"
            placeholder="Email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="inputBoxUser"
          />
          <input
            type="password"
            placeholder="Password"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
            className="inputBoxUser"
          />
          <input
            type="text"
            placeholder="CPF"
            value={editedCpf}
            onChange={(e) => setEditedCpf(e.target.value)}
            className="inputBoxUser"
          />
          <div className="separadorUser2">
            <button  type="submit" className="inputButton" onClick={handleSaveUser}>Salvar</button>
            <button type="submit" className="inputButton" onClick={() => setEditingUserIndex(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="fixedBottom separador">
        <button type="submit" className="inputButton" onClick={handleAdicionar}>Adicionar</button>
        <button type="submit" className="inputButton" onClick={handleCancel}>Cancelar</button>
        
      </div>
    </div>
  );
};

export default EditModality;
