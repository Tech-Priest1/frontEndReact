import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditModality = () => {
  const [gymTypes, setGymTypes] = useState([]);
  const [newGymType, setNewGymType] = useState('');
  const [normalPrice, setNormalPrice] = useState('');
  const [promotionalPrice, setPromotionalPrice] = useState('');
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
          promotionalPrice: parseFloat(promotionalPrice) 
        }
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

  const handleCancel = () => {
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
            <button type="submitModality" className='inputButton' onClick={() => handleDeleteGymType(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="fixedBottom">
        <input
          type="text"
          placeholder="Nova Modalidade"
          value={newGymType}
          onChange={(e) => setNewGymType(e.target.value)}
          className="inputBoxModality"
        />
        <input
          type="text"
          placeholder="Preço Normal"
          value={normalPrice}
          onChange={(e) => setNormalPrice(e.target.value)}
          className="inputBoxModality"
        />
        <input
          type="text"
          placeholder="Preço Promocional"
          value={promotionalPrice}
          onChange={(e) => setPromotionalPrice(e.target.value)}
          className="inputBoxModality"
        />
        <div className="separadorModality">
          <button type="submit" className='inputButton' onClick={handleAddGymType}>Adicionar</button>
          <button type="submit" className='inputButton' onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditModality;
