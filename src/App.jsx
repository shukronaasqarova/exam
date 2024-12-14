import React from 'react'
import Home from './pages/Home'
import CoinDetails from './pages/CoinDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </Router>
  )
}

export default App
