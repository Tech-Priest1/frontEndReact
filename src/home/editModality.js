import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditModality = () => {
  const [gymTypes, setGymTypes] = useState([]);
  const [newGymType, setNewGymType] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const [trainingDays, setTrainingDays] = useState(''); 
  const [modalityType, setModalityType] = useState(''); 
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
    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || [];
    setGymTypes(storedGymTypes);
  }, []);

  const handleAddGymType = () => {
    if (newGymType.trim() && normalPrice.trim() && promotionalPrice.trim() && trainingDays.trim() && modalityType.trim() && trainingTime.trim()) {
      const updatedGymTypes = [
        ...gymTypes,
        {
          name: newGymType,
          normalPrice: parseFloat(normalPrice),
          promotionalPrice: parseFloat(promotionalPrice),
          trainingDays, 
          modalityType,
          trainingTime,
        },
      ];
      setGymTypes(updatedGymTypes);
      localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes));
      setNewGymType('');
      setNormalPrice('');
      setPromotionalPrice('');
      setTrainingDays(''); 
      setModalityType(''); 
      setTrainingTime(''); 
    }
  };

  const handleDeleteGymType = (index) => {
    const updatedGymTypes = gymTypes.filter((_, i) => i !== index);
    setGymTypes(updatedGymTypes);
    localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes));
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

  const handleSaveModality = () => {
    if (editingIndex !== null) {
      const updatedGymTypes = [...gymTypes];
      updatedGymTypes[editingIndex] = {
        name: editedName,
        normalPrice: parseFloat(editedNormalPrice),
        promotionalPrice: parseFloat(editedPromotionalPrice),
        trainingDays: editedTrainingDays,
        modalityType: editedModalityType,
        trainingTime: editedTrainingTime,
      };
      setGymTypes(updatedGymTypes);
      localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes));
      setEditingIndex(null);
      setEditedName('');
      setEditedNormalPrice('');
      setEditedPromotionalPrice('');
      setEditedTrainingDays('');
      setEditedModalityType('');
      setEditedTrainingTime('');
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
        {gymType.name} - Normal: {gymType.normalPrice} - Promocional: {gymType.promotionalPrice} - Dias de Treino: {gymType.trainingDays} - Tipo: {gymType.modalityType} - Hora: {gymType.trainingTime}
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
        <input
          type="text"
          placeholder="Tipo de Modalidade"
          value={editingIndex !== null ? editedModalityType : modalityType}
          onChange={(e) => editingIndex !== null ? setEditedModalityType(e.target.value) : setModalityType(e.target.value)}
          className="inputBoxModality"
        />
        <input
          type="time"
          placeholder="Hora do Treino"
          value={editingIndex !== null ? editedTrainingTime : trainingTime}
          onChange={(e) => editingIndex !== null ? setEditedTrainingTime(e.target.value) : setTrainingTime(e.target.value)}
          className="inputBoxModality"
        />

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
