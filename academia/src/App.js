import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/login'
import Home from './home/home'
import EditModality from './home/editModality'
import Register from './login/register'
import RegisterMember from './member/registerMember'
import EditMember from './member/editMember'
import './App.css'
import { useState, useEffect } from 'react'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const initialGymTypes = ['Musculação', 'Jiu-jitsu', 'Judô'];
    const storedGymTypes = JSON.parse(localStorage.getItem('gymTypes'));

    if (!storedGymTypes || storedGymTypes.length === 0) {
      localStorage.setItem('gymTypes', JSON.stringify(initialGymTypes));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
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
         element={<RegisterMember />} 
         />
         <Route 
            path="/editMember/:id"  
            element={<EditMember />} 
          />
           <Route 
            path="/editModality/"  
            element={<EditModality />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
