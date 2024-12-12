import React from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import { Routes, Route,} from 'react-router-dom'
import './App.css'


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Routes>
    </div>
  )
}

export default App