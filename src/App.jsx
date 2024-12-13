import React from 'react'
import Home from './pages/Home'
import CoinDetails from './pages/CoinDetails'
import { Routes, Route,} from 'react-router-dom'
import './App.css'


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
    </div>
  )
}

export default App