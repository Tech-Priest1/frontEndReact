// UserProfile.js
import React, { useState } from 'react';

const UserProfile = ({ currentUser }) => {
  const [avatar, setAvatar] = useState(currentUser.avatar || DEFAULT_AVATAR_URL);

  const updateAvatar = (newAvatarUrl) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user =>
      user.email === currentUser.email ? { ...user, avatar: newAvatarUrl } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setAvatar(newAvatarUrl);
  };

  const handleAvatarChange = () => {
    const newAvatarUrl = prompt("Enter new avatar URL:"); 
    if (newAvatarUrl) {
      updateAvatar(newAvatarUrl);
    }
  };

  return (
    <div>
      <img src={avatar} alt="User Avatar" onClick={handleAvatarChange} />
      
    </div>
  );
};

export default UserProfile;
