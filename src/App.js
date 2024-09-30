import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import HomeMember from './member/homeMember';
import EditModality from './home/editModality';
import Register from './login/register';
import RegisterMember from './member/registerMember';
import EditMember from './member/editMember';
import EditUsers from './home/editUsers';
import ProtectedRoute from './login/protectedRoute';
import Navbar from './navBar/navBar';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(''); 
  const [memberName, setMemberName] = useState(''); 
  const [, setCpf] = useState('');
  const [memberId, setMemberId] = useState(''); 
  const [userRole, setUserRole] = useState(''); 
  const [avatar, setAvatar] = useState('/avatar.png'); 

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token'); 
    setLoggedIn(false);
    setEmail(''); 
    setMemberName(''); 
    setCpf(''); 
    setUserRole(''); 
    setAvatar('/avatar.png'); 
    setMemberId(''); 
  };

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          handleLogout={handleLogout} 
          email={userRole === 'admin' ? email : undefined} 
          avatar={avatar} 
          updateAvatar={updateAvatar} 
          loggedIn={loggedIn} 
          role={userRole} 
          name={userRole === 'member' ? memberName : undefined} 
        />

        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} avatar={avatar} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} setCpf={setCpf} setAvatar={setAvatar} setUserRole={setUserRole} setMemberName={setMemberName} setMemberId={setMemberId} />} />
          <Route path="/home/home" element={<ProtectedRoute loggedIn={loggedIn} isAdmin={userRole === 'admin'}><Home /></ProtectedRoute>} />
          <Route path="/member/homeMember" element={<ProtectedRoute loggedIn={loggedIn}><HomeMember loggedIn={loggedIn} memberId={memberId} avatar={avatar} setLoggedIn={setLoggedIn} /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/homeMember/:id" element={<ProtectedRoute loggedIn={loggedIn}><HomeMember loggedIn={loggedIn} memberId={memberId} avatar={avatar} setLoggedIn={setLoggedIn} /></ProtectedRoute>} />
          <Route path="/registerMember" element={<ProtectedRoute loggedIn={loggedIn} isAdmin={userRole === 'admin'}><RegisterMember /></ProtectedRoute>} />
          <Route path="/editMember/:id" element={<ProtectedRoute loggedIn={loggedIn}><EditMember isAdmin={userRole === 'admin'} /></ProtectedRoute>} />
          <Route path="/editModality" element={<ProtectedRoute loggedIn={loggedIn} isAdmin={userRole === 'admin'}><EditModality /></ProtectedRoute>} />
          <Route path="/editUsers" element={<ProtectedRoute loggedIn={loggedIn} isAdmin={userRole === 'admin'}><EditUsers /></ProtectedRoute>} />
          <Route path="*" element={<Home email={email} loggedIn={loggedIn} avatar={avatar} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
