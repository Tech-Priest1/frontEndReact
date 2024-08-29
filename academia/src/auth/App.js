import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login/Login'
import Register from './login/Register'
import Home from './home/Home'
import './App.css'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
