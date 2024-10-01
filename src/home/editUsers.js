import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './editUsers.css';

const EditAdmin = () => {
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedCpf, setEditedCpf] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (index) => {
    const user = users[index];
    setEditingUserIndex(index);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedPassword(''); 
    setEditedCpf(user.cpf);
  };

  const handleSaveUser = async () => {
    if (editedPassword.length < 5) {
      alert('Senha precisa de no mínimo 5 caracteres.');
      return;
    }
    if (editedCpf.length !== 11) {
      alert('CPF precisa conter 11 números.');
      return;
    }

    if (editingUserIndex !== null) {
      const updatedUser = {
        name: editedName,
        email: editedEmail,
        password: editedPassword,
        cpf: editedCpf,
      };

      try {
        const userId = users[editingUserIndex]._id;
        const response = await axios.put(`http://localhost:5000/api/admin/${userId}`, updatedUser); 
    
        const updatedUsers = [...users];
        updatedUsers[editingUserIndex] = response.data; 
        setUsers(updatedUsers);
    
        setEditingUserIndex(null);
      } catch (error) {
        alert(error.response?.data?.message || 'Erro ao atualizar usuário.');
      }
    }
  };

  const handleDeleteUser = async (index) => {
    const userId = users[index]._id; 
  
    try {
      await axios.delete(`http://localhost:5000/api/admin/${userId}`);
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao deletar usuário.');
    }
  };
  

  const handleAdicionar = () => {
    navigate('/register');
  };

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
          <li key={user._id} className="userItem">
            <div className="userDetails">
              <div className="userInfo">
                <h3>{user.name}</h3>
                <b>Email:</b> {user.email}<br/>
                <b>CPF:</b> {user.cpf}
              </div>
            </div>
            <div className="separadorUser1">
              <button type="button" className="inputButton" onClick={() => handleEditUser(index)}>Edit</button>
              <button type="button" className="inputButton" onClick={() => handleDeleteUser(index)}>Delete</button>
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
            <button type="button" className="inputButton" onClick={handleSaveUser}>Salvar</button>
            <button type="button" className="inputButton" onClick={() => setEditingUserIndex(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="fixedBottom separador">
        <button type="button" className="inputButton" onClick={handleAdicionar}>Adicionar</button>
        <button type="button" className="inputButton" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditAdmin;
