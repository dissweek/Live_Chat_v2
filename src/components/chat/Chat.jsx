import React, { useEffect, useState } from 'react'
import Sidebar from './components/SideBar'
import ChatBody from './components/ChatBody'
import InputBlock from './components/InputBlock'
import styles from './Chat.module.scss'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'

const socket=io.connect('http://localhost:5000')

const Chat = () => {
  const { search } = useLocation();
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [messages,setMessages] = useState([])

  useEffect(()=>{
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setRoom(searchParams.room)
    setName(searchParams.name)
    searchParams.role = 'user'
    console.log(searchParams)


    socket.emit('join',{...searchParams,})
  },[search])


  useEffect(()=>{
    socket.on('post',(data)=>{
      setMessages([...messages,data])
    })
  },[messages])

  

  return (
    <div className={styles.chat}>
        <Sidebar socket={socket} />
        <main className='main'>
            <ChatBody socket={socket} messages={messages}  name={name} />
            <InputBlock socket={socket} user={{name,room,role:'user'}} />
        </main>
    </div>
  )
}

export default Chat