import React from 'react'
import './App.css'
import Homepage from './components/Homepage'
import ContactPage from './components/Contactpage'
import AddGame from './components/AddGame'

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ContactPage' element={<ContactPage />} />
        <Route path='/AddGame' element={<AddGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App