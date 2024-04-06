import { Route, Routes } from 'react-router-dom'
import Home from './components/home/home'
import Chat from './components/chat/Chat'
import { useState } from 'react'
import { io } from 'socket.io-client'

const socket=io.connect('http://localhost:5000')




function App() {
 const [name,setNamee] = useState('')

 const getName = (a) =>{
  setNamee(a)
 }

  return (
    <Routes>
        <Route path='/' element={<Home getName={getName} socket={socket} />} />
        <Route path='/chat/*' element={<Chat name={name} socket={socket} />} />
    </Routes>
  )
}

export default App