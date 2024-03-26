import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Home from './components/home/home'
import Chat from './components/chat/Chat'


const socket=socketIO.connect('http://localhost:5000')

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/chat' element={<Chat socket={socket} />} />
    </Routes>
  )
}

export default App
