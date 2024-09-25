import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import EditModality from './home/editModality';
import Register from './login/register';
import RegisterMember from './member/registerMember';
import EditMember from './member/editMember';
import EditUsers from './home/editUsers'; 
import ProtectedRoute from './login/protectedRoute';
import Navbar from './navBar/navBar';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('../public/avatar.png'); // Set a default avatar

  useEffect(() => {
    const initialGymTypes = [
      { name: "Musculação", normalPrice: 50, promotionalPrice: 40 },
      { name: "Judô", normalPrice: 80, promotionalPrice: 70 },
    ];

    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes')) || [];

    if (storedGymTypes.length === 0) {
      localStorage.setItem('gymTypes', JSON.stringify(initialGymTypes));
    }
  }, []);

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar); 
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');  // Clear email
    setAvatar('../public/avatar.png'); // Reset to default avatar
  };

  // Debugging log to check the App's state
  console.log('App State:', { loggedIn, email, avatar });

  return (
    <div className="App">
      <BrowserRouter>
        {/* Always render Navbar */}
        <Navbar 
          handleLogout={handleLogout} 
          email={email} 
          avatar={avatar} 
          updateAvatar={updateAvatar} 
          loggedIn={loggedIn} // Use loggedIn state directly
        />
        
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} avatar={avatar} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/registerMember"
            element={<ProtectedRoute loggedIn={loggedIn}><RegisterMember /></ProtectedRoute>}
          />
          <Route
            path="/editMember/:id"
            element={<ProtectedRoute loggedIn={loggedIn}><EditMember /></ProtectedRoute>}
          />
          <Route
            path="/editModality"
            element={<ProtectedRoute loggedIn={loggedIn}><EditModality /></ProtectedRoute>}
          />
          <Route
            path="/editUsers"
            element={<ProtectedRoute loggedIn={loggedIn}><EditUsers /></ProtectedRoute>}
          />
          <Route
            path="*"
            element={<Home email={email} loggedIn={loggedIn} avatar={avatar} setLoggedIn={setLoggedIn} />}
          />
        </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
