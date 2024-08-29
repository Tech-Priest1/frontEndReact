import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Register from './login/Register'
import Home from './home/Home'
import RegisterMember from './login/RegisterMember'
import { useState } from 'react'
import './App.css'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
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
            path="/home" 
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} 
          />
          <Route 
            path="/registerMember" 
            element={<RegisterMember />} 
          />
          <Route 
            path="*" 
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App