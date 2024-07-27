import React from 'react'
import './App.css'
import Homepage from './components/Homepage'
import ContactPage from './components/Contactpage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ContactPage' element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App