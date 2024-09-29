import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API requests
import { jwtDecode } from 'jwt-decode';


import './editModality.css';

const EditModality = () => {
  const [gymTypes, setGymTypes] = useState([]);
  const [newGymType, setNewGymType] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const [trainingDays, setTrainingDays] = useState(''); 
  const [modalityType, setModalityType] = useState(''); 
  const [initialTime, setInitialTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [trainingTime, setTrainingTime] = useState(''); 

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedNormalPrice, setEditedNormalPrice] = useState('');
  const [editedPromotionalPrice, setEditedPromotionalPrice] = useState('');
  const [editedTrainingDays, setEditedTrainingDays] = useState(''); 
  const [editedModalityType, setEditedModalityType] = useState('');
  const [editedTrainingTime, setEditedTrainingTime] = useState(''); 
  const navigate = useNavigate();


  useEffect(() => {
    if (initialTime && endTime) {
      setTrainingTime(`${initialTime} - ${endTime}`);
    }
  }, [initialTime, endTime]);
  
  useEffect(() => {
    if (editingIndex !== null && initialTime && endTime) {
      setEditedTrainingTime(`${initialTime} - ${endTime}`);
    }
  }, [initialTime, endTime, editingIndex]);
  
  useEffect(() => {
    const fetchGymTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/gym', {
          headers: {
            Authorization: `Bearer ${token}` // autorizar com token
          }
        });
        setGymTypes(response.data);
      } catch (error) {
        alert('Erro ao carregar tipos de academia.');
      }
    };
    fetchGymTypes();
  }, []);

  const handleAddGymType = async () => {
    if (newGymType.trim() && normalPrice.trim() && promotionalPrice.trim() && trainingDays.trim() && modalityType.trim() && trainingTime.trim()) {
      try {
        const token = localStorage.getItem('token'); 
        console.log('Token:', token); 
        const decodedToken = jwtDecode(token);
        const adminId = decodedToken.id;
  
        const newGymTypeData = {
          name: newGymType,
          normalPrice: parseFloat(normalPrice),
          promotionalPrice: parseFloat(promotionalPrice),
          trainingDays, 
          modalityType,
          trainingTime,
          admin: adminId 
        };
  
        // Send the request to your backend with the token in headers
        await axios.post('http://localhost:5000/api/gym', newGymTypeData, {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in the Authorization header
          }
        });
  
        // Fetch the updated gym types
        const response = await axios.get('http://localhost:5000/api/gym', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setGymTypes(response.data);
      } catch (error) {
        console.error('Error ao adicionar modalidade:', error);
        alert('Erro ao adicionar tipo de academia.');
      }
    }
  };
  

  const handleDeleteGymType = async (index) => {
    const gymTypeId = gymTypes[index]._id;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/gym/${gymTypeId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in the Authorization header
        }
      });
      const updatedGymTypes = gymTypes.filter((_, i) => i !== index);
      setGymTypes(updatedGymTypes);
    } catch (error) {
      alert('Erro ao deletar tipo de academia.');
    }
  };

  const handleEditModality = (index) => {
    const gymType = gymTypes[index];
    setEditingIndex(index);
    setEditedName(gymType.name);
    setEditedNormalPrice(gymType.normalPrice.toString());
    setEditedPromotionalPrice(gymType.promotionalPrice.toString());
    setEditedTrainingDays(gymType.trainingDays);
    setEditedModalityType(gymType.modalityType);
    setEditedTrainingTime(gymType.trainingTime);
  };

  const handleSaveModality = async () => {
    if (editingIndex !== null) {
      const gymTypeId = gymTypes[editingIndex]._id;
      const updatedGymTypeData = {
        name: editedName,
        normalPrice: parseFloat(editedNormalPrice),
        promotionalPrice: parseFloat(editedPromotionalPrice),
        trainingDays: editedTrainingDays,
        modalityType: editedModalityType,
        trainingTime: editedTrainingTime
      };

      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:5000/api/gym/${gymTypeId}`, updatedGymTypeData, {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in the Authorization header
          }
        });

        const updatedGymTypes = [...gymTypes];
        updatedGymTypes[editingIndex] = response.data;
        setGymTypes(updatedGymTypes);
        setEditingIndex(null);
        setEditedName('');
        setEditedNormalPrice('');
        setEditedPromotionalPrice('');
        setEditedTrainingDays('');
        setEditedModalityType('');
        setEditedTrainingTime('');
      } catch (error) {
        alert('Erro ao atualizar tipo de academia.');
      }
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setNewGymType('');
    setNormalPrice('');
    setPromotionalPrice('');
    setTrainingDays(''); 
    setModalityType(''); 
    setTrainingTime(''); 
    navigate('/');
  };
  return (
    <div className="modalityContainer">
      <div>
        <h3 className="modalityTitulo">Editar Tipos de Inscrição</h3>
      </div>
      <ul className="modalityList">
        {gymTypes.map((gymType, index) => (
          <li key={index} className="modalityItem">
            <div className="modalityText">
              {gymType.name} / <b>Normal:</b> {gymType.normalPrice} - <b>Promocional:</b> {gymType.promotionalPrice} - <b>Dias de Treino:</b> {gymType.trainingDays} - <b>Tipo:</b> {gymType.modalityType} - <b>Hora:</b> {gymType.trainingTime}
            </div>
            <div className="separadorModality">
              <button type="button" className="inputButton" onClick={() => handleEditModality(index)}>Editar</button>
              <button type="button" className="inputButton" onClick={() => handleDeleteGymType(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="fixedBottom">
      <input
          type="text"
          placeholder={editingIndex !== null ? 'Nome' : 'Nova Modalidade'}
          value={editingIndex !== null ? editedName : newGymType}
          onChange={(e) => editingIndex !== null ? setEditedName(e.target.value) : setNewGymType(e.target.value)}
          className="inputBoxModality"
        />
        <input
          type="text"
          placeholder="Preço Normal"
          value={editingIndex !== null ? editedNormalPrice : normalPrice}
          onChange={(e) => editingIndex !== null ? setEditedNormalPrice(e.target.value) : setNormalPrice(e.target.value)}
          className="inputBoxModality"
        />
        <input
          type="text"
          placeholder="Preço Promocional"
          value={editingIndex !== null ? editedPromotionalPrice : promotionalPrice}
          onChange={(e) => editingIndex !== null ? setEditedPromotionalPrice(e.target.value) : setPromotionalPrice(e.target.value)}
          className="inputBoxModality"
        />
        <input
          type="text"
          placeholder="Dias de Treino"
          value={editingIndex !== null ? editedTrainingDays : trainingDays}
          onChange={(e) => editingIndex !== null ? setEditedTrainingDays(e.target.value) : setTrainingDays(e.target.value)}
          className="inputBoxModality"
        />
       <select
    value={editingIndex !== null ? editedModalityType : modalityType}
    onChange={(e) => editingIndex !== null ? setEditedModalityType(e.target.value) : setModalityType(e.target.value)}
    className="inputBoxModality"
>
    <option value="">Selecione o tipo de modalidade</option>
    <option value="Artes Marciais">Artes Marciais</option>
    <option value="Treinamento de força">Treinamento de força</option>
    <option value="Danças">Danças</option>
    <option value="Pilates">Pilates</option>
</select>

<div className="modalityContainer">
      <input
        type="time"
        value={initialTime}
        onChange={(e) => setInitialTime(e.target.value)}
        placeholder="Hora Inicial"
        className="inputBoxModality"
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="Hora Final"
        className="inputBoxModality"
      />

      <div>
        <span>Horário: {trainingTime}</span>
      </div>
    </div>

        {editingIndex !== null ? (
          <>
            <div className="separador">
              <button type="button" className="inputButton" onClick={handleSaveModality}>Salvar</button>
              <button type="button" className="inputButton" onClick={() => setEditingIndex(null)}>Cancelar</button>
            </div>
          </>
        ) : (
          <>
            <div className="separador">
              <button type="button" className="inputButton" onClick={handleAddGymType}>Adicionar</button>
              <button type="button" className="inputButton" onClick={handleCancel}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditModality;
