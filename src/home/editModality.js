import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditModality = () => {
  const [gymTypes, setGymTypes] = useState([]);
  const [newGymType, setNewGymType] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedNormalPrice, setEditedNormalPrice] = useState('');
  const [editedPromotionalPrice, setEditedPromotionalPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || [];
    setGymTypes(storedGymTypes);
  }, []);

  const handleAddGymType = () => {
    if (newGymType.trim() && normalPrice.trim() && promotionalPrice.trim()) {
      const updatedGymTypes = [
        ...gymTypes,
        {
          name: newGymType,
          normalPrice: parseFloat(normalPrice),
          promotionalPrice: parseFloat(promotionalPrice),
        },
      ];
      setGymTypes(updatedGymTypes);
      localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes));
      setNewGymType('');
      setNormalPrice('');
      setPromotionalPrice('');
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
    setEditedNormalPrice(gymType.normalPrice.toString()); // converte strings
    setEditedPromotionalPrice(gymType.promotionalPrice.toString());
  };

  const handleSaveModality = () => {
    if (editingIndex !== null) {
      const updatedGymTypes = [...gymTypes];
      updatedGymTypes[editingIndex] = {
        name: editedName,
        normalPrice: parseFloat(editedNormalPrice),
        promotionalPrice: parseFloat(editedPromotionalPrice),
      };
      setGymTypes(updatedGymTypes);
      localStorage.setItem('gymTypes', JSON.stringify(updatedGymTypes));
      setEditingIndex(null);
      setEditedName('');
      setEditedNormalPrice('');
      setEditedPromotionalPrice('');
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setNewGymType('');
    setNormalPrice('');
    setPromotionalPrice('');
    navigate('/');
  };

  return (
    <div className="modalityContainer">
      <div>
        <h3 className="modalityTitulo">Editar Tipos de Inscrição</h3>
      </div>
      <ul className="modalityList">
        {gymTypes.map((gymType, index) => (
          <li key={index}>
            {gymType.name} - Normal: {gymType.normalPrice} - Promocional: {gymType.promotionalPrice}
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
