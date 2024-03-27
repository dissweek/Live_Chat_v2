import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/home'
import Chat from './components/chat/Chat'




function App() {

  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
    </Routes>
  )
}

export default App
